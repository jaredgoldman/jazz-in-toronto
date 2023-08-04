import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'

export const featuredRouter = createTRPCRouter({
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
    })
})
