// Libraries
import { z } from 'zod'
import cloudinary from 'cloudinary'
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
import CanvasService from '../services/canvasService'

export const eventRouter = createTRPCRouter({
    create: publicProcedure
        .input(
            z.object({
                name: z.string(),
                startDate: z.date(),
                endDate: z.date(),
                photoPath: z.string().optional(),
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
                    band: { connect: { id: input.bandId } },
                    venue: { connect: { id: input.venueId } }
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
                        gte: new Date(input.date),
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
                photoPath: z.string().optional(),
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
                where: { id: input.id },
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

    getVenueEvents: publicProcedure
        .input(z.object({ venueId: z.string().cuid(), date: z.date() }))
        .mutation(async ({ ctx, input }) => {
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
                            console.log('Event already exists, skipping')
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

    post: publicProcedure
        .input(z.object({ date: z.date() }))
        .mutation(async ({ ctx, input }) => {
            // Fetch daily Events
            const events = await ctx.prisma.event.findMany({
                where: {
                    startDate: {
                        gte: new Date(input.date),
                        lt: new Date(addDays(input.date, 1))
                    }
                },
                include: {
                    band: true,
                    venue: true
                }
            })

            const canvasService = new CanvasService()
            const postService = new PostService(events, cloudinary.v2)

            return await postService.createSavePost(canvasService, input.date)
        })
})
