import { describe, it, expect, beforeAll } from 'vitest'
import ScraperService from '../scraperService'
import { prisma } from '~/server/db'
import { Venue } from '@prisma/client'
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
    it('should be able to scrape a website', async () => {
        const scraperService = new ScraperService(venue)
        const events = await scraperService.getEvents()
        console.log(JSON.stringify(events.events))
    })
})
