import { Venue } from '@prisma/client'
import { prisma } from '../src/server/db'
import { ArtistNameGenerator } from './artistNameGenerator'
import { env } from '~/env.mjs'
import { Genre } from '@prisma/client'

const artistNameGenerator = new ArtistNameGenerator()
const seed = async () => {
    // create 100 artists
    const artists = Array.from({ length: 50 }).map((_, i) => ({
        name: artistNameGenerator.generateArtistName(),
        genre: Genre.JAZZ,
        photoPath: 'https://picsum.photos/200/300',
        photoName: 'photo.jpg',
        instagramHandle: `@artist${i + 1}`,
        website: `https://google.com`
    }))
    await prisma.artist.createMany({ data: artists })
    const artistsData = await prisma.artist.findMany()

    await generateVenues()
    const venuesData = await prisma.venue.findMany()

    const oneDay = 60 * 60 * 24 * 1000
    // create 100 days with 100 events
    for (let i = 0; i < 10; i++) {
        const events = artistsData.map((artist, j) => {
            return {
                name: artist.name,
                startDate: new Date(Date.now() + j * oneDay),
                endDate: new Date(Date.now() + j * oneDay + oneDay),
                instagramHandle: `@event${i + 1}`,
                website: `https://google.com`,
                artistId: artist.id,
                venueId: venuesData[
                    Math.floor(Math.random() * venuesData.length)
                ]?.id as Venue['id']
            }
        })

        await prisma.event.createMany({ data: events })
    }
    await generateAdmin()
}

const generateVenues = async () => {
    await prisma.venue.create({
        data: {
            name: 'The Rex',
            address: '194 Queen St W',
            city: 'Toronto',
            photoPath: 'https://picsum.photos/200/300',
            photoName: 'photo.jpg',
            instagramHandle: '@therextoronto',
            website: 'therex.ca',
            latitude: 43.6509,
            longitude: -79.3883,
            crawlable: true,
            eventsPath: '/events',
            phoneNumber: '416-598-2475',
            facebookLink: 'https://www.facebook.com/therextoronto',
            approved: true
        }
    })
    await prisma.venue.create({
        data: {
            name: 'Drom Taberna',
            address: '458 Queen St W',
            city: 'Toronto',
            photoPath: 'https://picsum.photos/200/300',
            photoName: 'photo.jpg',
            instagramHandle: '@dromtaberna',
            website: 'dromtaberna.com',
            latitude: 43.6479,
            longitude: -79.4004,
            crawlable: true,
            eventsPath: '/events-9O8Cm',
            phoneNumber: '416-598-2475',
            facebookLink: 'https://www.facebook.com/dromtaberna',
            approved: true
        }
    })
    await prisma.venue.create({
        data: {
            name: 'Jazz Bistro',
            address: '251 Victoria St',
            city: 'Toronto',
            photoPath: 'https://picsum.photos/200/300',
            photoName: 'photo.jpg',
            instagramHandle: '@jazzbistroto',
            website: 'jazzbistro.ca',
            latitude: 43.6559,
            longitude: -79.3794,
            crawlable: true,
            eventsPath: '/performance_calendar',
            phoneNumber: '416-363-5299',
            facebookLink: 'https://www.facebook.com/JazzBistroTO',
            approved: true
        }
    })
}

const generateAdmin = async () => {
    await prisma.admin.create({
        data: {
            email: env.EMAIL_SERVER_USER
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
