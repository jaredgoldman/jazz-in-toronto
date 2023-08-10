// Libraries
import { z } from 'zod'
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure
} from '~/server/api/trpc'
// Utils
import addDays from 'date-fns/addDays'
// Services
import ScraperService from '../services/scraperService'
import PostService from '../services/postService'

export const eventRouter = createTRPCRouter({
    create: publicProcedure
        .input(
            z.object({
                name: z.string(),
                startDate: z.date(),
                endDate: z.date(),
                featured: z.boolean().optional(),
                instagramHandle: z.string().optional(),
                website: z.string().optional(),
                bandId: z.string().cuid(),
                venueId: z.string().cuid()
            })
        )
        .mutation(({ ctx, input }) => {
            const { bandId, venueId, ...eventData } = input
            return ctx.prisma.event.create({
                data: {
                    ...eventData,
                    band: { connect: { id: bandId } },
                    venue: { connect: { id: venueId } }
                }
            })
        }),

    get: publicProcedure
        .input(z.object({ id: z.string().cuid() }))
        .query(({ ctx, input }) => {
            return ctx.prisma.event.findUnique({
                where: { id: input.id }
            })
        }),

    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.event.findMany({
            include: {
                band: true,
                venue: true
            }
        })
    }),

    getAllByDay: publicProcedure
        .input(z.object({ date: z.date() }))
        .query(({ ctx, input }) => {
            return ctx.prisma.event.findMany({
                where: {
                    startDate: {
                        gte: new Date(input.date.setHours(0, 0, 0, 0)),
                        lt: new Date(addDays(input.date, 1))
                    }
                },
                include: {
                    band: true,
                    venue: true
                }
            })
        }),

    getAllByMonth: publicProcedure
        .input(z.object({ month: z.number(), year: z.number() }))
        .query(({ ctx, input }) => {
            return ctx.prisma.event.findMany({
                where: {
                    startDate: {
                        gte: new Date(input.year, input.month, 1),
                        lt: new Date(input.year, input.month + 1, 1)
                    }
                },
                include: {
                    band: true,
                    venue: true
                }
            })
        }),

    update: protectedProcedure
        .input(
            z.object({
                id: z.string().cuid(),
                name: z.string().optional(),
                startDate: z.date().optional(),
                endDate: z.date().optional(),
                featured: z.boolean().optional(),
                instagramHandle: z.string().optional(),
                website: z.string().optional(),
                bandId: z.string().cuid().optional(),
                venueId: z.string().cuid().optional(),
                cancelled: z.boolean().optional()
            })
        )
        .mutation(({ ctx, input }) => {
            const { id, ...eventData } = input
            return ctx.prisma.event.update({
                where: { id },
                data: eventData
            })
        }),

    delete: protectedProcedure
        .input(z.object({ id: z.string().cuid() }))
        .mutation(({ ctx, input }) => {
            return ctx.prisma.event.delete({
                where: { id: input.id }
            })
        }),

    getVenueEvents: protectedProcedure
        .input(z.object({ venueId: z.string().cuid(), date: z.date() }))
        .mutation(async ({ ctx, input }) => {
            console.log('Attempting to scrape venue events for', input)

            const venue = await ctx.prisma.venue.findUnique({
                where: { id: input.venueId }
            })
            if (venue) {
                const scraper = new ScraperService(venue)
                await scraper.init()
                const events = await scraper.getEvents(input.date)
                const processedEvents = []
                if (events) {
                    //  Tranform partialEvent to Event
                    for (const event of events) {
                        const existingEvent = await ctx.prisma.event.findFirst({
                            where: {
                                name: {
                                    contains: event.name.toLowerCase(),
                                    mode: 'insensitive'
                                },
                                venueId: { equals: input.venueId },
                                startDate: { equals: event.startDate }
                            }
                        })

                        if (existingEvent) {
                            continue
                        }
                        let band
                        // Create band for even name if band doesn't exist
                        // TODO: Clean name before this step
                        band = await ctx.prisma.band.findFirst({
                            where: {
                                name: {
                                    contains: event.name.toLowerCase(),
                                    mode: 'insensitive'
                                }
                            }
                        })

                        if (!band) {
                            band = await ctx.prisma.band.create({
                                data: {
                                    name: event.name
                                }
                            })
                        }
                        const processedEvent = await ctx.prisma.event.create({
                            data: {
                                name: event.name,
                                venueId: input.venueId,
                                bandId: band.id,
                                startDate: event.startDate,
                                endDate: event.endDate
                            },
                            include: {
                                band: true,
                                venue: true
                            }
                        })
                        processedEvents.push(processedEvent)
                    }
                    return processedEvents
                }
            }
        }),

    post: protectedProcedure
        .input(
            z.object({
                files: z.array(
                    z.object({ fileKey: z.string(), fileUrl: z.string() })
                ),
                caption: z.string()
            })
        )
        .mutation(async ({ input }) => {
            // post to instagram
            const postService = new PostService(input)
            await postService.postAndDeleteImages()
            // return res.status(200).json({ message: 'Posted to Instagram' })
        }),

    getFeatured: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.event.findFirst({
            where: { featured: true },
            include: {
                band: true,
                venue: true
            }
        })
    }),

    setFeatured: protectedProcedure
        .input(z.object({ id: z.string().cuid() }))
        .mutation(async ({ ctx, input }) => {
            // First remove any other features
            // Only one band hsould be featured at a time
            await ctx.prisma.event.updateMany({
                where: { featured: true },
                data: { featured: false }
            })
            return ctx.prisma.event.update({
                where: { id: input.id },
                data: { featured: true }
            })
        })
})
