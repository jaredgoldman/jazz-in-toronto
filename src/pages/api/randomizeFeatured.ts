import { prisma } from '~/server/db'

export default async function handler() {
    const totalEvents = await prisma.event.count({ where: { approved: true } })
    const totalVenues = await prisma.venue.count({ where: { approved: true } })
    const totalArtists = await prisma.artist.count({
        where: { approved: true }
    })

    const randomEvent = await prisma.event
        .findMany({
            where: { approved: true },
            skip: Math.floor(Math.random() * totalEvents),
            take: 1
        })
        .then((results) => results[0])

    const randomVenue = await prisma.venue
        .findMany({
            where: { approved: true },
            skip: Math.floor(Math.random() * totalVenues),
            take: 1
        })
        .then((results) => results[0])

    const randomArtist = await prisma.artist
        .findMany({
            where: { approved: true },
            skip: Math.floor(Math.random() * totalArtists),
            take: 1
        })
        .then((results) => results[0])

    randomEvent &&
        (await prisma.event.update({
            data: { featured: true },
            where: { id: randomEvent.id }
        }))

    randomVenue &&
        (await prisma.venue.update({
            data: { featured: true },
            where: { id: randomVenue.id }
        }))
    randomArtist &&
        (await prisma.artist.update({
            data: { featured: true },
            where: { id: randomArtist.id }
        }))
}
