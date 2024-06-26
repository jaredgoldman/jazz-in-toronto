import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '~/server/db'

/**
 * Randomizes the featured event, venue, and artist.
 */
export default async function handler(
    _request: NextApiRequest,
    response: NextApiResponse
) {
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

    await prisma.event.updateMany({
        where: { featured: true },
        data: { featured: false }
    })

    randomEvent &&
        (await prisma.event.update({
            data: { featured: true },
            where: { id: randomEvent.id }
        }))

    await prisma.venue.updateMany({
        where: { featured: true },
        data: { featured: false }
    })

    randomVenue &&
        (await prisma.venue.update({
            data: { featured: true },
            where: { id: randomVenue.id }
        }))

    await prisma.artist.updateMany({
        where: { featured: true },
        data: { featured: false }
    })

    randomArtist &&
        (await prisma.artist.update({
            data: { featured: true },
            where: { id: randomArtist.id }
        }))

    return response.status(200).json({ success: true })
}
