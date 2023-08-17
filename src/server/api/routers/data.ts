import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure
} from '~/server/api/trpc'
import startOfWeek from 'date-fns/startOfWeek'
import addWeeks from 'date-fns/addWeeks'

export const dataRouter = createTRPCRouter({
    getFeatured: publicProcedure.query(async ({ ctx }) => {
        const venue = await ctx.prisma.venue.findFirst({
            where: { featured: true }
        })
        const band = await ctx.prisma.band.findFirst({
            where: { featured: true }
        })
        const event = await ctx.prisma.event.findFirst({
            where: { featured: true },
            include: { band: true, venue: true }
        })
        return {
            venue,
            band,
            event
        }
    }),

    getStats: protectedProcedure.query(async ({ ctx }) => {
        const allEventsCount = await ctx.prisma.event.count()

        const upcomingEventsCount = await ctx.prisma.event.count({
            where: {
                startDate: {
                    gte: new Date()
                },
                cancelled: false
            }
        })

        const thisWeekStart = startOfWeek(new Date())
        const eventsThisWeekCount = await ctx.prisma.event.count({
            where: {
                startDate: {
                    gte: thisWeekStart
                },
                endDate: {
                    lt: addWeeks(thisWeekStart, 1)
                }
            }
        })

        const venueCount = await ctx.prisma.venue.count({
            where: {
                active: true
            }
        })

        const bandCount = await ctx.prisma.band.count({
            where: {
                active: true
            }
        })

        return {
            allEventsCount,
            upcomingEventsCount,
            eventsThisWeekCount,
            venueCount,
            bandCount
        }
    })
})
