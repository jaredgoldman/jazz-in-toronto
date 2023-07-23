import puppeteer from 'puppeteer'
import * as cheerio from 'cheerio'
import { Venue } from '@prisma/client'
import { JsonTemplate, cheerioJsonMapper } from 'cheerio-json-mapper'
import { wait } from '~/utils/shared'

export default class ScraperService {
    private venue: Venue
    // private headless: boolean = process.env.NODE_ENV === 'development'
    private headless: boolean = true
    //
    constructor(venue: Venue) {
        this.venue = venue
    }

    private async scrapeSite(url: string) {
        const browser = await puppeteer.launch({ headless: this.headless })
        const page = await browser.newPage()
        await page.setViewport({ width: 1920, height: 1080 })
        await page.goto(url, {
            waitUntil: 'domcontentloaded'
        })
        // wait for any additional js to load
        await wait(1000)
        const html = await page.content()
        switch (this.venue.name.toLowerCase()) {
            case 'the rex':
                return await this.scrapeRexEvents(html)
            default:
                break
        }
    }

    private parseHtml(html: string, template: JsonTemplate) {
        return cheerioJsonMapper(html, template)
    }

    // private parseHtml(html: string, selectors: string[]) {
    //     // parse html
    //     // return parsed data
    // }

    public async getEvents() {
        if (!this.venue.website || !this.venue.eventsPath) {
            throw new Error('No website or events path provided')
        }
        const url = `${this.venue.website}${this.venue.eventsPath}`
        return await this.scrapeSite(url)
    }

    private async scrapeRexEvents(html: string): Promise<any> {
        const template: JsonTemplate = {
            $: 'body > .site-wrapper > main > .sections > .page-section > .content-wrapper > .content > .sqs-layout > .sqs-row > .span-7 > .sqs-block > .sqs-block-content > .yui3-widget > .yui3-squarespacecalendar-content > .yui3-calendar-pane',
            monthAndYear:
                '> .yui3-calendar-header > h1 > .yui3-calendar-header-label',
            events: {
                $: '> .yui3-u-1 > .yui3-calendar-grid > tbody',
                each: [
                    {
                        $: '> tr > .yui3-calendar-day',
                        date: {
                            $: '> .marker',
                            day: '> .marker-dayname',
                            date: '> .marker-daynum'
                        },
                        description: {
                            $: '> .itemlist > .item > .item-link',
                            time: '> .item-time',
                            name: '> .item-title'
                        }
                    }
                ]
            }
        }
        return this.parseHtml(html, template)
    }
}
