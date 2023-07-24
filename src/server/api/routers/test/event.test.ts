import { expect, it, describe, beforeAll, afterAll } from "vitest"
import { type RouterInputs } from "~/utils/api"
import { appRouter } from "~/server/api/root"
import { createInnerTRPCContext } from "~/server/api/trpc"
import { prisma } from "~/server/db"
import { type Admin, type Band, type Event, type Venue } from "@prisma/client"

const testVenueData = {
    name: "test venue",
    address: "123 test street",
    city: "Toronto",
    website: "test.com",
    longitude: 0,
    latitude: 0
}

const testBandData = {
    name: "test event band",
}

let venue: Venue
let band: Band
let event: Event
let admin: Admin
let testEventData: RouterInputs["event"]["create"]

beforeAll(async () => {
    venue = await prisma.venue.create({ data: testVenueData })
    band = await prisma.band.create({ data: testBandData })
    admin = await prisma.admin.create({
        data: { email: "eventtest@test.com", password: "password" },
    })
    testEventData = {
        name: "event test event",
        startDate: new Date(Date.now()),
        endDate: new Date(Date.now() + 1000 * 60 * 60 * 2),
        bandId: band.id,
        venueId: venue.id,
    }
})

describe("Event Router", () => {
    it("should allow an unauthorized user to create an event", async () => {
        const ctx = createInnerTRPCContext({ session: null })
        const caller = appRouter.createCaller(ctx)

        const input: RouterInputs["event"]["create"] = testEventData

        event = await caller.event.create(input)

        const query = await prisma.event.findMany({
            where: { name: testEventData.name },
        })
        expect(query[0]?.name).toEqual(testEventData.name)
    })

    it("should allow an authorized user to edit an event", async () => {
        const ctx = createInnerTRPCContext({
            session: {
                user: {
                    id: admin.id,
                    name: admin.name,
                    email: admin.email,
                },
                expires: "1",
            },
        })

        const caller = appRouter.createCaller(ctx)

        const input: RouterInputs["event"]["update"] = {
            id: event.id,
            name: "updated event name",
        }

        const updatedEvent = await caller.event.update(input)

        expect(updatedEvent.name).toEqual(input.name)

        // Revert event name
        const revertInput: RouterInputs["event"]["update"] = {
            id: event.id,
            name: event.name,
        }

        const revertedEvent = await caller.event.update(revertInput)

        expect(revertedEvent.name).toEqual(event.name)
    })

    it("should allow an authorized user to fetch an event", async () => {
        const ctx = createInnerTRPCContext({
            session: {
                user: {
                    id: admin.id,
                    name: admin.name,
                    email: admin.email,
                },
                expires: "1",
            },
        })
        const caller = appRouter.createCaller(ctx)

        const input: RouterInputs["event"]["get"] = { id: event.id }

        const fetchedEvent = await caller.event.get(input)

        expect(fetchedEvent?.name).toEqual(event.name)
    })

    it("should allow an authorized user to delete an event", async () => {
        const ctx = createInnerTRPCContext({
            session: {
                user: {
                    id: admin.id,
                    name: admin.name,
                    email: admin.email,
                },
                expires: "1",
            },
        })
        const caller = appRouter.createCaller(ctx)

        const input: RouterInputs["event"]["delete"] = { id: event.id }

        const deletedEvent = await caller.event.delete(input)

        expect(deletedEvent.id).toEqual(event.id)
    })
})

afterAll(async () => {
    await prisma.band.delete({ where: { id: band.id } })
    await prisma.venue.delete({ where: { id: venue.id } })
    await prisma.admin.delete({ where: { id: admin.id } })
}, 100)
