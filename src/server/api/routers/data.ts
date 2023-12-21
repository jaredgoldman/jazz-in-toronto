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
        const artist = await ctx.prisma.artist.findFirst({
            where: { featured: true }
        })
        const event = await ctx.prisma.event.findFirst({
            where: { featured: true },
            include: { artist: true, venue: true }
        })
        return {
            venue,
            artist,
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

        const artistCount = await ctx.prisma.artist.count({
            where: {
                active: true
            }
        })

        return {
            allEventsCount,
            upcomingEventsCount,
            eventsThisWeekCount,
            venueCount,
            artistCount
        }
    })
})
