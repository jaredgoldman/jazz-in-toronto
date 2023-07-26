// Libraries
import puppeteer from 'puppeteer'
import { cheerioJsonMapper, type JsonTemplate } from 'cheerio-json-mapper'
// types
import { type Venue, type PartialEvent } from '~/types/data'
// Utils
import { wait } from '~/utils/shared'
import { nonNullable } from '~/utils/typeguards'
import { type RexEvent, type VenueEvents } from './types'
// Data
import rexJson from './templates/rex.json'

export default class ScraperService {
    private venue: Venue

    constructor(venue: Venue) {
        this.venue = venue
    }

    public async getEvents() {
        if (!this.venue.website || !this.venue.eventsPath) {
            throw new Error('No website or events path provided')
        }
        const url = `${this.venue.website}${this.venue.eventsPath}`
        const content = await this.loadContents(url)
        return await this.scrapeSite(content)
    }

    private async loadContents(url: string): Promise<string> {
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.setViewport({ width: 1920, height: 1080 })
        await page.goto(url, {
            waitUntil: 'domcontentloaded'
        })
        // wait for any additional js to load
        // TODO: Wait for certain selector
        await wait(1000)
        return await page.content()
    }

    private async scrapeSite(content: string): Promise<PartialEvent[]> {
        switch (this.venue.name.toLowerCase()) {
            case 'the rex':
                return this.scrapeRexEvents(content)
            case 'jazz bistro':
            // return this.scrapeJazzBistroEvents(content)
            case 'drom taberna':
            // return this.scrapeDromTabernaEvents(content)
            default:
                throw new Error("Venue doesn't exist or is not crawlable")
        }
    }

    private async mapEvents<T>(html: string, json: JsonTemplate): Promise<T> {
        return (await cheerioJsonMapper(html, json)) as T
    }

    private async scrapeRexEvents(html: string): Promise<PartialEvent[]> {
        const { monthAndYear, events } = await this.mapEvents<
            VenueEvents<RexEvent>
        >(html, rexJson)

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
        const eventData = events.each
            .map((event: RexEvent) => {
                if (event.date && event?.description) {
                    const time = event.description.time.split(/\s+/)[1]!
                    const hours = Number(time.split(':')[0])
                    const minutes = Number(time.split(':')[1])
                    const day = Number(event.date.date)
                    const startDate = new Date(year, month, day, hours, minutes)
                    const endDate = new Date(
                        year,
                        month,
                        day,
                        hours + 2,
                        minutes
                    )
                    return {
                        startDate,
                        endDate,
                        name: event.description.name,
                        venueId: this.venue.id
                    }
                }
            }) // filter events via typeguard
            .filter(nonNullable)
        return eventData
    }

    // private async scrapeJazzBistroEvents(
    //     content: string
    // ): Promise<PartialEvent> {}
    // private async scrapeDromTabernaEvents(
    //     content: string
    // ): Promise<PartialEvent> {}
}
