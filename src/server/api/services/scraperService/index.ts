// Libraries
import { cheerioJsonMapper, type JsonTemplate } from 'cheerio-json-mapper'
// types
import { type Venue, type PartialEvent } from '~/types/data'
import playwright from 'playwright-core'
// Utils
import chromium from '@sparticuz/chromium-min'
import { wait } from '~/utils/shared'
import { type RexEvent, type VenueEvents } from './types'
// Data
import rexJson from './templates/rex.json'

export default class ScraperService {
    private venue: Venue
    private page?: playwright.Page
    private initialized = false

    constructor(venue: Venue) {
        if (!venue.website || !venue.eventsPath) {
            throw new Error('No website or events path provided')
        }
        this.venue = venue
    }

    public async init(): Promise<void> {
        await this.loadPage()
        this.initialized = true
    }

    public async getEvents(date: Date): Promise<PartialEvent[]> {
        if (!this.initialized) {
            throw new Error('Scraper not initialized')
        }
        switch (this.venue.name.toLowerCase()) {
            case 'the rex':
                return await this.scrapeRexEvents(date)
            case 'jazz bistro':
            // return this.scrapeJazzBistroEvents(content)
            case 'drom taberna':
            // return this.scrapeDromTabernaEvents(content)
            default:
                throw new Error("Venue doesn't exist or is not crawlable")
        }
    }

    private async loadPage(): Promise<void> {
        const url = `${this.venue.website}${this.venue?.eventsPath || ''}`
        const browser = await playwright.chromium.launch({
            args: chromium.args,
            executablePath: await chromium.executablePath(
                'https://jazz-in-toronto.s3.us-east-2.amazonaws.com/chromium-v115.0.0-pack.tar'
            )
        })
        const page = await browser.newPage()
        // await page.setViewport({ width: 1920, height: 1080 })
        await page.goto(url, {
            waitUntil: 'domcontentloaded'
        })
        // wait for any additional js to load
        // TODO: Wait for certain selector
        await wait(1000)
        this.page = page
    }

    private async mapEvents<T>(html: string, json: JsonTemplate): Promise<T> {
        return (await cheerioJsonMapper(html, json)) as T
    }

    private async scrapeRexEvents(date: Date): Promise<PartialEvent[]> {
        const json = JSON.stringify(rexJson)
        if (!this.page) {
            throw new Error('No page loaded')
        }
        const monthIndex = date.getMonth()
        const currentMonthIndex = new Date().getMonth()

        const nextMonthButton = await this.page.waitForSelector(
            `${rexJson['$']} > .yui3-calendar-header > .yui3-calendarnav-nextmonth`
        )

        // If the month is in the future, we need to click the next month button
        if (nextMonthButton) {
            for (let i = 0; i < monthIndex - currentMonthIndex; i++) {
                await nextMonthButton.click()
            }
        }

        await wait(500)

        const html = await this.page.content()

        const {
            monthAndYear,
            monthlyEvents: { dailyEvents }
        } = await this.mapEvents<VenueEvents<RexEvent>>(json, rexJson)

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
        const processedEvents: PartialEvent[] = []
        dailyEvents.forEach(({ date, sets }: RexEvent) => {
            console.log({
                date,
                sets
            })
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

                    processedEvents.push({
                        startDate,
                        endDate,
                        name: name,
                        venueId: this.venue.id
                    })
                })
            }
        })
        return processedEvents
    }

    // private async scrapeJazzBistroEvents(
    //     content: string
    // ): Promise<PartialEvent> {}
    // private async scrapeDromTabernaEvents(
    //     content: string
    // ): Promise<PartialEvent> {}
}
