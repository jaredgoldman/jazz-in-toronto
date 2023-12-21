import { expect, it, describe, beforeAll, afterAll } from 'vitest'
import { type RouterInputs } from '~/utils/api'
import { appRouter } from '~/server/api/root'
import { createInnerTRPCContext } from '~/server/api/trpc'
import { prisma } from '~/server/db'
import { Area, type Admin, type Venue } from '@prisma/client'

const testVenueData = {
    name: 'venue test venue',
    address: '123 test street',
    website: 'www.google.com',
    city: 'test city',
    longitude: 0,
    latitude: 0,
    phoneNumber: '6474548412',
    area: Area.ANNEX
}

let venue: Venue
let admin: Admin

beforeAll(async () => {
    admin = await prisma.admin.create({
        data: {
            name: 'test admin',
            email: 'venue@test.com',
            password: 'test'
        }
    })
})

describe('Venue Router', () => {
    it('should allow an unauthorized user to create a venue', async () => {
        const ctx = createInnerTRPCContext({ session: null })
        const caller = appRouter.createCaller(ctx)

        const input: RouterInputs['venue']['create'] = testVenueData

        venue = await caller.venue.create(input)

        const query = await prisma.venue.findMany({
            where: { name: testVenueData.name }
        })
        expect(query.length).toEqual(1)
    })

    it('should allow an authorized user to edit a venue', async () => {
        const ctx = createInnerTRPCContext({
            session: {
                user: {
                    id: admin.id,
                    name: admin.name,
                    email: admin.email
                },
                expires: '1'
            }
        })
        const caller = appRouter.createCaller(ctx)

        const input: RouterInputs['venue']['update'] = {
            id: venue.id,
            name: 'updated venue name'
        }

        const updatedVenue = await caller.venue.update(input)

        expect(updatedVenue.name).toEqual(input.name)

        // Revert venue name
        const revertInput: RouterInputs['venue']['update'] = {
            id: venue.id,
            name: venue.name
        }

        const revertedVenue = await caller.venue.update(revertInput)

        expect(revertedVenue.name).toEqual(venue.name)
    })
    it('should allow an authorized user to fetch an venue', async () => {
        const ctx = createInnerTRPCContext({
            session: {
                user: {
                    id: admin.id,
                    name: admin.name,
                    email: admin.email
                },
                expires: '1'
            }
        })
        const caller = appRouter.createCaller(ctx)

        const input: RouterInputs['venue']['get'] = { id: venue.id }

        const fetchedVenue = await caller.venue.get(input)

        expect(fetchedVenue?.name).toEqual(venue.name)
    })

    it('should allow an authorized user to delete an venue', async () => {
        const ctx = createInnerTRPCContext({
            session: {
                user: {
                    id: admin.id,
                    name: admin.name,
                    email: admin.email
                },
                expires: '1'
            }
        })
        const caller = appRouter.createCaller(ctx)

        const input: RouterInputs['venue']['delete'] = { id: venue.id }

        const deletedVenue = await caller.venue.delete(input)

        expect(deletedVenue.id).toEqual(venue.id)
    })
})

afterAll(async () => {
    await prisma.admin.delete({ where: { id: admin.id } })
})
