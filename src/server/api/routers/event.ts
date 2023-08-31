// Libraries
import { z } from 'zod'
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure
} from '~/server/api/trpc'
// Utils
import addDays from 'date-fns/addDays'

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
                artistId: z.string().cuid(),
                venueId: z.string().cuid()
            })
        )
        .mutation(({ ctx, input }) => {
            const { artistId, venueId, ...eventData } = input
            return ctx.prisma.event.create({
                data: {
                    ...eventData,
                    artist: { connect: { id: artistId } },
                    venue: { connect: { id: venueId } }
                }
            })
        }),

    createMany: protectedProcedure
        .input(
            z.array(
                z.object({
                    name: z.string(),
                    startDate: z.date(),
                    endDate: z.date(),
                    featured: z.boolean().optional(),
                    instagramHandle: z.string().nullable(),
                    website: z.string().nullable(),
                    artistId: z.string().cuid(),
                    venueId: z.string().cuid()
                })
            )
        )
        .mutation(({ ctx, input }) => {
            return ctx.prisma.event.createMany({
                data: input
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
                artist: true,
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
                    artist: true,
                    venue: true
                },
                orderBy: {
                    startDate: 'asc'
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
                    artist: true,
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
                artistId: z.string().cuid().optional(),
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
            const venue = await ctx.prisma.venue.findUnique({
                where: { id: input.venueId }
            })
            if (venue && ctx.scraperService) {
                await ctx.scraperService.init(venue)
                const events = await ctx.scraperService.getEvents(input.date)
                if (events) {
                    // add artist to listing if name is exact
                    for (const event of events) {
                        const maybeArtist = await ctx.prisma.artist.findUnique({
                            where: {
                                name: event.artist.name
                            }
                        })
                        if (maybeArtist) {
                            event.artist = maybeArtist
                        }
                    }
                    return events
                    // const existingEvent = await ctx.prisma.event.findUnique(
                    //     {
                    //         where: {
                    //             startDate_venueId: {
                    //                 venueId: input.venueId,
                    //                 startDate: input.date
                    //             }
                    //         }
                    //     }
                    // )
                    //
                    // if (
                    //     existingEvent &&
                    //     existingEvent.name
                    //         .toLowerCase()
                    //         .includes(event.name.toLowerCase())
                    // ) {
                    //     continue
                    // }
                    // let artist
                    // // Create artist for even name if artist doesn't exist
                    // // TODO: Clean name before this step
                    // // XXX: This takes FOREVER - need to speed this query up
                    // artist = await ctx.prisma.artist.findFirst({
                    //     where: {
                    //         name: {
                    //             contains: event.name.toLowerCase(),
                    //             mode: 'insensitive'
                    //         }
                    //     }
                    // })
                    //
                    // if (!artist) {
                    //     artist = await ctx.prisma.artist.create({
                    //         data: {
                    //             name: event.name
                    //         }
                    //     })
                    // }
                    //
                    // const processedEvent = await ctx.prisma.event.create({
                    //     data: {
                    //         name: event.name,
                    //         venueId: input.venueId,
                    //         artistId: artist.id,
                    //         startDate: event.startDate,
                    //         endDate: event.endDate
                    //     },
                    //     include: {
                    //         artist: true,
                    //         venue: true
                    //     }
                    // })
                    // processedEvents.push(processedEvent)
                    // }
                    // return processedEvents
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
        .mutation(async ({ ctx, input }) => {
            // post to instagram
            if (ctx.postService) {
                ctx.postService.init(input)
                await ctx.postService.postAndDeleteImages()
                // return res.status(200).json({ message: 'Posted to Instagram' })
            }
        }),

    getFeatured: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.event.findFirst({
            where: { featured: true },
            include: {
                artist: true,
                venue: true
            }
        })
    }),

    setFeatured: protectedProcedure
        .input(z.object({ id: z.string().cuid() }))
        .mutation(async ({ ctx, input }) => {
            // First remove any other features
            // Only one artist hsould be featured at a time
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
