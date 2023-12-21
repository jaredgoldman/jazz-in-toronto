import { eventRouter } from './routers/event'
import { createTRPCRouter } from '~/server/api/trpc'
import { venueRouter } from './routers/venue'
import { adminRouter } from './routers/admin'
import { artistRouter } from './routers/artist'
import { dataRouter } from './routers/data'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */

export const config = {
    runtime: 'edge'
}

export const appRouter = createTRPCRouter({
    event: eventRouter,
    venue: venueRouter,
    admin: adminRouter,
    artist: artistRouter,
    data: dataRouter
})

// export type definition of API
export type AppRouter = typeof appRouter
