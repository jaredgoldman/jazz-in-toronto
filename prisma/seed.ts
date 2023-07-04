import { Venue } from "@prisma/client"
import { prisma } from "../src/server/db"
import { BandNameGenerator } from "./bandNameGenerator"

const bandNameGenerator = new BandNameGenerator()

const seed = async () => {
    // create 100 bands
    const bands = Array.from({ length: 100 }).map((_, i) => ({
        name: bandNameGenerator.generateBandName(),
        genre: "jazz",
        photoPath: "https://picsum.photos/200/300",
        instagramHandle: `@band${i + 1}`,
        website: `https://google.com`,
    }))
    await prisma.band.createMany({ data: bands })
    const bandsData = await prisma.band.findMany()
    // create 100 venues
    const venues = Array.from({ length: 100 }).map((_, i) => ({
        name: `Venue ${i + 1}`,
        address: `100 Yonge St`,
        city: "Toronto",
        photoPath: "https://picsum.photos/200/300",
        instagramHandle: `@venue${i + 1}`,
        website: `https://google.com`,
    }))
    await prisma.venue.createMany({ data: venues })
    const venuesData = await prisma.venue.findMany()
    // create 100 events
    const events = bandsData.map((band, i) => {
        return {
            name: `Event ${i + 1}`,
            startDate: new Date(),
            endDate: new Date(Date.now() + 60 * 60 * 24 * 7),
            photoPath: "https://picsum.photos/200/300",
            instagramHandle: `@event${i + 1}`,
            website: `https://google.com`,
            bandId: band.id,
            venueId: venuesData[i]?.id as Venue["id"],
        }
    })
    await prisma.event.createMany({ data: events })
    await prisma.admin.create({
        data: {
            email: "test@test.com",
            password: "test",
        },
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
