import { expect, it, beforeAll, afterAll } from "vitest"

import { type RouterInputs } from "~/utils/api"
import { appRouter } from "~/server/api/root"
import { createInnerTRPCContext } from "~/server/api/trpc"
import { prisma } from "~/server/db"
import { Band, Event, Venue } from "@prisma/client"

const testVenueData = {
    name: "test venue",
    address: "123 test street",
    city: "Toronto",
    website: "test.com",
}

const testBandData = {
    name: "test band",
}

let venue: Venue
let band: Band
let event: Event
let testEventData: RouterInputs["event"]["create"]

beforeAll(async () => {
    // create a venue and a band
    venue = await prisma.venue.create({ data: testVenueData })
    band = await prisma.band.create({ data: testBandData })

    testEventData = {
        name: "test event",
        startDate: new Date(Date.now()).toISOString(),
        endDate: new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString(),
        bandId: band.id,
        venueId: venue.id,
    }
})

it("unauthed user should be able to create an event", async () => {
    const ctx = createInnerTRPCContext({ session: null })
    const caller = appRouter.createCaller(ctx)

    const input: RouterInputs["event"]["create"] = testEventData

    event = await caller.event.create(input)

    const query = await prisma.event.findMany({
        where: { name: testEventData.name },
    })
    expect(query.length).toEqual(1)
})

afterAll(async () => {
    await prisma.event.delete({ where: { id: event.id } })
    await prisma.venue.delete({ where: { id: venue.id } })
    await prisma.band.delete({ where: { id: band.id } })
})
