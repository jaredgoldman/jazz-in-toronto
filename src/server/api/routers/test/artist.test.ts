import { expect, it, describe, beforeAll, afterAll } from 'vitest'
import { RouterInputs } from '~/utils/api'
import { appRouter } from '~/server/api/root'
import { createInnerTRPCContext } from '~/server/api/trpc'
import { prisma } from '~/server/db'
import { TRPCError } from '@trpc/server'
import { Admin, type Artist } from '@prisma/client'

const testartistData = {
    name: 'test artist'
}
let artist: Artist
let admin: Admin

beforeAll(async () => {
    const artists = Array.from({ length: 25 }, (_, i) => {
        return { name: `test artist ${i}` }
    })
    await prisma.artist.createMany({ data: artists })
    admin = await prisma.admin.create({
        data: {
            email: 'admin@test.com'
        }
    })
})

describe('artist Router', () => {
    // CREATE
    it('allows a user to create an event', async () => {
        const ctx = createInnerTRPCContext({ session: null })
        const caller = appRouter.createCaller(ctx)

        const input: RouterInputs['artist']['create'] = testartistData

        artist = await caller.artist.create(input)

        const query = await prisma.artist.findUnique({
            where: { name: testartistData.name }
        })
        expect(query?.name).toEqual(testartistData.name)
    })
    // READ
    it('allows a user to fetch a number of artists', async () => {
        const ctx = createInnerTRPCContext({ session: null })
        const caller = appRouter.createCaller(ctx)

        const artists = await caller.artist.getAll()
        // XXX: For some reason the events test does not always clean up in time
        // for this test run, leaving a nextra artist in the above query
        const enoughartists = artists.length === 26 || artists.length === 27
        expect(enoughartists).toBeTruthy()
    })
    // uPDATE
    it('allows an admin to update an event', async () => {
        const ctx = createInnerTRPCContext({
            session: {
                user: {
                    id: admin.id
                },
                expires: '1'
            }
        })
        const caller = appRouter.createCaller(ctx)

        const input: RouterInputs['artist']['update'] = {
            id: artist.id,
            name: 'updated test artist'
        }
        await caller.artist.update(input)

        const updatedartist = await prisma.artist.findUnique({
            where: { id: artist.id }
        })
        expect(updatedartist?.name).toEqual(input.name)
    })
    it('does not allow an unauthorized user to update an event', async () => {
        const ctx = createInnerTRPCContext({ session: null })
        const caller = appRouter.createCaller(ctx)

        const input: RouterInputs['artist']['update'] = {
            id: artist.id,
            name: 'updated name'
        }

        let res
        try {
            artist = await caller.artist.update(input)
        } catch (error) {
            expect(error).toStrictEqual(new TRPCError({ code: 'UNAUTHORIZED' }))
            expect(res).toBeUndefined()
        }
    })
    // DELETE
    it('allows an admin to delete an artist', async () => {
        const ctx = createInnerTRPCContext({
            session: {
                user: {
                    id: admin.id
                },
                expires: '1'
            }
        })
        const caller = appRouter.createCaller(ctx)

        const input: RouterInputs['artist']['delete'] = {
            id: artist.id
        }
        await caller.artist.delete(input)

        const updatedartist = await prisma.artist.findUnique({
            where: { id: artist.id }
        })
        expect(updatedartist).toBeNull()
    })

    it('does not allow an unauthorized user to delete an event', async () => {
        const ctx = createInnerTRPCContext({ session: null })
        const caller = appRouter.createCaller(ctx)

        const input: RouterInputs['artist']['delete'] = {
            id: artist.id
        }

        let res
        try {
            artist = await caller.artist.delete(input)
        } catch (error) {
            expect(error).toStrictEqual(new TRPCError({ code: 'UNAUTHORIZED' }))
            expect(res).toBeUndefined()
        }
    })
})

afterAll(async () => {
    await prisma.admin.delete({ where: { id: admin.id } })
    await prisma.artist.deleteMany({
        where: { name: { contains: 'test artist' } }
    })
})
