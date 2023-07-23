import puppeteer from 'puppeteer'
import { Venue } from '@prisma/client'
import { wait } from '~/utils/shared'
import RexService from './venues/rexService'

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
        await wait(1000)
        return await page.content()
    }

    private async scrapeSite(content: string) {
        switch (this.venue.name.toLowerCase()) {
            case 'the rex':
                const rexService = new RexService(this.venue)
                return await rexService.scrapeRexEvents(content)
            default:
                break
        }
    }
}
