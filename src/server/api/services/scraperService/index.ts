// Libraries
import { cheerioJsonMapper, JsonTemplate } from 'cheerio-json-mapper'
import { TRPCError } from '@trpc/server'
import puppeterr, { Page } from 'puppeteer-core'
import { createId } from '@paralleldrive/cuid2'
// types
import type { Venue, EventWithArtistVenue } from '~/types/data'
// Utils
import chromium from '@sparticuz/chromium-min'
import { wait } from '~/utils/shared'
import type { RexEvent, VenueEvents } from './types'
import { env } from '~/env.mjs'
// Data
import rexJson from './templates/rex.json'

export default class ScraperService {
    private venue!: Venue
    private page?: Page
    private initialized = false

    public async init(venue: Venue): Promise<void> {
        if (!venue.website || !venue.eventsPath) {
            throw new TRPCError({
                message: 'No website or events path provided',
                code: 'BAD_REQUEST'
            })
        }

        this.venue = venue
        console.log('Initializing scraper for venue', this.venue)
        await this.loadPage()
        this.initialized = true
    }

    public async getEvents(date: Date): Promise<EventWithArtistVenue[]> {
        if (!this.initialized) {
            throw new TRPCError({
                message: 'Scraper not initialized',
                code: 'BAD_REQUEST'
            })
        }
        switch (this.venue.name.toLowerCase()) {
            case 'the rex':
                return await this.scrapeRexEvents(date)
            default:
                throw new TRPCError({
                    message: "Venue doesn't exist or is not crawlable",
                    code: 'BAD_REQUEST'
                })
        }
    }

    private async loadPage(): Promise<void> {
        try {
            const url = `https://${this.venue.website}${
                this.venue?.eventsPath || ''
            }`

            const browser = await puppeterr.launch({
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--single-process'
                ],
                executablePath: await chromium.executablePath(
                    env.CHROME_EXECUTABLE_PATH
                )
            })

            const page = await browser.newPage()
            await page.goto(url, {
                waitUntil: 'domcontentloaded'
            })
            // wait for any additional js to load
            // TODO: Wait for certain selector
            await wait(1000)
            this.page = page
        } catch (e) {
            console.error('Error loading page to scrape', e)
        }
    }

    private async mapEvents<T>(html: string, json: JsonTemplate): Promise<T> {
        return (await cheerioJsonMapper(html, json)) as T
    }

    private titleArticles = ['in', 'for', 'of', 'and', 'a', 'an', 'to']

    private formatName(name: string) {
        return name
            .split(' ')
            .map((word) => {
                const lowerWord = word.toLowerCase()
                if (this.titleArticles.includes(lowerWord)) return lowerWord
                return lowerWord.charAt(0).toUpperCase() + lowerWord.slice(1)
            })
            .join(' ')
    }

    /*
     * TODO: Modularize this process
     */
    private async scrapeRexEvents(date: Date): Promise<EventWithArtistVenue[]> {
        if (!this.page) {
            throw new Error('No page loaded')
        }

        const monthIndex = date.getMonth()
        const currentMonthIndex = new Date().getMonth()
        const isFutureMonth = currentMonthIndex - monthIndex < 0
        let monthNavButton

        // // If the month is in the future, we need to click the next month button
        if (isFutureMonth) {
            monthNavButton = await this.page.waitForSelector(
                `${rexJson['$']} > .yui3-calendar-header > .yui3-calendarnav-nextmonth`
            )
        } else {
            monthNavButton = await this.page.waitForSelector(
                `${rexJson['$']} > .yui3-calendar-header > .yui3-calendarnav-prevmonth`
            )
        }

        if (monthNavButton) {
            // Get the absolute difference between the two months
            const difference = Math.abs(monthIndex - currentMonthIndex)
            for (let i = 0; i < difference; i++) {
                await monthNavButton.click() // Click the correct button based on whether you're going to a future or previous month
            }
        }

        await wait(500)

        const html = await this.page.content()

        const {
            monthAndYear,
            monthlyEvents: { dailyEvents }
        } = await this.mapEvents<VenueEvents<RexEvent>>(html, rexJson)

        if (!dailyEvents.length) {
            throw new Error('Error getting daily events')
        }

        // Parse calendar heading
        if (monthAndYear.split(' ').length !== 2) {
            throw new Error('Error getting date headng')
        }

        // Process month and year
        const year = Number(monthAndYear.split(/\s+/)[1])
        const monthString = monthAndYear.split(/\s+/)[0]

        if (!year || !monthString) {
            throw new Error('Error processing current month and year')
        }

        // Find month number
        const month = new Date(`${monthString} 1 ${year}`).getMonth()

        // Map partial events, convert strings to numbers where necessary
        const processedEvents: EventWithArtistVenue[] = []
        dailyEvents.forEach(({ date, sets }: RexEvent) => {
            if (date && sets?.each) {
                // map through sets in each daily events object
                sets.each.forEach(({ name, time }) => {
                    // parse time and date
                    const tfTime = time.split(/\s+/)[1] as string
                    const hours = Number(tfTime.split(':')[0])
                    const minutes = Number(tfTime.split(':')[1])
                    const day = Number(date.date)
                    const startDate = new Date(year, month, day, hours, minutes)
                    const endDate = new Date(
                        year,
                        month,
                        day,
                        // Rex sets are 2 hours long
                        hours + 2,
                        minutes
                    )

                    const createdAt = new Date()
                    const updatedAt = new Date()
                    const formattedName = this.formatName(name)

                    // Shape data like event with placeholder ids
                    processedEvents.push({
                        id: createId(),
                        createdAt,
                        updatedAt,
                        featured: false,
                        startDate,
                        endDate,
                        name: formattedName,
                        venueId: this.venue.id,
                        artistId: '',
                        website: null,
                        instagramHandle: null,
                        cancelled: false,
                        description: null,
                        venue: this.venue,
                        approved: true,
                        artist: {
                            id: createId(),
                            name: '',
                            createdAt,
                            updatedAt,
                            photoPath: null,
                            instagramHandle: null,
                            website: null,
                            featured: false,
                            active: true,
                            description: null,
                            genre: null,
                            approved: false
                        }
                    })
                })
            }
        })
        return processedEvents
    }
}
