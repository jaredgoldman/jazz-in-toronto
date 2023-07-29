import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import ScraperService from '../scraperService'
import { prisma } from '~/server/db'
import { type Venue } from '@prisma/client'
import { addMonths } from 'date-fns'
let venue: Venue

beforeAll(async () => {
    venue = await prisma.venue.create({
        data: {
            name: 'The Rex',
            address: '194 Queen St W',
            city: 'Toronto',
            photoPath: 'https://picsum.photos/200/300',
            instagramHandle: '@therextoronto',
            website: 'https://therex.ca/',
            latitude: 43.6509,
            longitude: -79.3883,
            crawlable: true,
            eventsPath: 'events'
        }
    })
})

describe('Scraper service', () => {
    it('should be able to scrape a website and return an array of events', async () => {
        const scraperService = new ScraperService(venue)
        await scraperService.init()
        const events = await scraperService.getEvents(addMonths(new Date(), 1))
        expect(events.length).toBeGreaterThan(0)
        console.log(events)
        // console.log(events)
        events.forEach((event) => {
            // confirm that all events have a name, date, and time
            expect(event.name).toBeDefined()
            expect(event.startDate).toBeDefined()
            expect(event.startDate.getMonth()).toBe(
                addMonths(new Date(), 1).getMonth()
            )
            expect(event.endDate).toBeDefined()
            expect(event.venueId).toBeDefined()
        })
    })
})

afterAll(async () => {
    await prisma.venue.delete({ where: { id: venue.id } })
})
