import { eventRouter } from './routers/event'
import { createTRPCRouter } from '~/server/api/trpc'
import { venueRouter } from './routers/venue'
import { adminRouter } from './routers/admin'
import { bandRouter } from './routers/band'
import { cmsRouter } from './routers/cms'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    event: eventRouter,
    venue: venueRouter,
    admin: adminRouter,
    band: bandRouter,
    cms: cmsRouter
})

// export type definition of API
export type AppRouter = typeof appRouter
