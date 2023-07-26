import { Venue } from '@prisma/client'
import { prisma } from '../src/server/db'
import { BandNameGenerator } from './bandNameGenerator'

const bandNameGenerator = new BandNameGenerator()

const seed = async () => {
    // create 100 bands
    const bands = Array.from({ length: 100 }).map((_, i) => ({
        name: bandNameGenerator.generateBandName(),
        genre: 'jazz',
        photoPath: 'https://picsum.photos/200/300',
        instagramHandle: `@band${i + 1}`,
        website: `https://google.com`
    }))
    await prisma.band.createMany({ data: bands })
    const bandsData = await prisma.band.findMany()

    await generateVenues()
    const venuesData = await prisma.venue.findMany()

    const oneDay = 60 * 60 * 24 * 1000
    // create 100 days with 100 events
    // for (let i = 0; i < 100; i++) {
    //     const events = bandsData.map((band) => {
    //         return {
    //             name: `Event ${i + 1}`,
    //             startDate: new Date(Date.now() + i * oneDay),
    //             endDate: new Date(Date.now() + i * oneDay + oneDay),
    //             photoPath: 'https://picsum.photos/200/300',
    //             instagramHandle: `@event${i + 1}`,
    //             website: `https://google.com`,
    //             bandId: band.id,
    //             venueId: venuesData[0]?.id as Venue['id']
    //         }
    //     })
    //
    //     await prisma.event.createMany({ data: events })
    // }
    await prisma.admin.create({
        data: {
            email: 'test@test.com',
            password: 'test'
        }
    })
}

const generateVenues = async () => {
    await prisma.venue.create({
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
    await prisma.venue.create({
        data: {
            name: 'Drom Taberna',
            address: '458 Queen St W',
            city: 'Toronto',
            photoPath: 'https://picsum.photos/200/300',
            instagramHandle: '@dromtaberna',
            website: 'https://dromtaberna.com/',
            latitude: 43.6479,
            longitude: -79.4004,
            crawlable: true,
            eventsPath: 'events-9O8Cm'
        }
    })
}

seed()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
