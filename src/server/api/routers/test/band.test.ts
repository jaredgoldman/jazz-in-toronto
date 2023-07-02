import { expect, it, describe, beforeAll, afterAll } from "vitest"
import { type RouterInputs } from "~/utils/api"
import { appRouter } from "~/server/api/root"
import { createInnerTRPCContext } from "~/server/api/trpc"
import { prisma } from "~/server/db"
import { TRPCError } from "@trpc/server"
import { Admin, Band } from "@prisma/client"

const testBandData = {
    name: "test band",
}
let band: Band
let admin: Admin

beforeAll(async () => {
    const bands = Array.from({ length: 25 }, (_, i) => {
        return { name: "test band " + i }
    })
    await prisma.band.createMany({ data: bands })
    admin = await prisma.admin.create({
        data: {
            email: "admin@test.com",
            password: "password",
        },
    })
})

describe("Band Router", () => {
    // CREATE
    it("allows a user to create an event", async () => {
        const ctx = createInnerTRPCContext({ session: null })
        const caller = appRouter.createCaller(ctx)

        const input: RouterInputs["band"]["create"] = testBandData

        band = await caller.band.create(input)

        const query = await prisma.band.findUnique({
            where: { name: testBandData.name },
        })
        expect(query?.name).toEqual(testBandData.name)
    })
    // READ
    it("allows a user to fetch a number of bands", async () => {
        const ctx = createInnerTRPCContext({ session: null })
        const caller = appRouter.createCaller(ctx)

        const bands = await caller.band.getAll()
        // XXX: For some reason the events test does not always clean up in time
        // for this test run, leaving a nextra band in the above query
        const enoughBands = bands.length === 26 || bands.length === 27
        expect(enoughBands).toBeTruthy()
    })
    // uPDATE
    it("allows an admin to update an event", async () => {
        const ctx = createInnerTRPCContext({
            session: {
                user: {
                    id: admin.id,
                },
                expires: "1",
            },
        })
        const caller = appRouter.createCaller(ctx)

        const input: RouterInputs["band"]["update"] = {
            id: band.id,
            name: "updated test band",
        }
        await caller.band.update(input)

        const updatedBand = await prisma.band.findUnique({
            where: { id: band.id },
        })
        expect(updatedBand?.name).toEqual(input.name)
    })
    it("does not allow an unauthorized user to update an event", async () => {
        const ctx = createInnerTRPCContext({ session: null })
        const caller = appRouter.createCaller(ctx)

        const input: RouterInputs["band"]["update"] = {
            id: band.id,
            name: "updated name",
        }

        let res
        try {
            band = await caller.band.update(input)
        } catch (error) {
            expect(error).toStrictEqual(new TRPCError({ code: "UNAUTHORIZED" }))
            expect(res).toBeUndefined()
        }
    })
    // DELETE
    it("allows an admin to delete an band", async () => {
        const ctx = createInnerTRPCContext({
            session: {
                user: {
                    id: admin.id,
                },
                expires: "1",
            },
        })
        const caller = appRouter.createCaller(ctx)

        const input: RouterInputs["band"]["delete"] = {
            id: band.id,
        }
        await caller.band.delete(input)

        const updatedBand = await prisma.band.findUnique({
            where: { id: band.id },
        })
        expect(updatedBand).toBeNull()
    })

    it("does not allow an unauthorized user to delete an event", async () => {
        const ctx = createInnerTRPCContext({ session: null })
        const caller = appRouter.createCaller(ctx)

        const input: RouterInputs["band"]["delete"] = {
            id: band.id,
        }

        let res
        try {
            band = await caller.band.delete(input)
        } catch (error) {
            expect(error).toStrictEqual(new TRPCError({ code: "UNAUTHORIZED" }))
            expect(res).toBeUndefined()
        }
    })
})

afterAll(async () => {
    await prisma.admin.delete({ where: { id: admin.id } })
    await prisma.band.deleteMany({ where: { name: { contains: "test band" } } })
})
