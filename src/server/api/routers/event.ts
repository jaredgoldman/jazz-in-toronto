import { z } from 'zod'
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure
} from '~/server/api/trpc'
import { env } from '~/env.mjs'
import { PrismaClient, Venue } from '@prisma/client'
import { EventWithArtistVenue } from '~/types/data'
import { DateTime } from 'luxon'

// Shared helpers
const getAllByDay = (date: Date, prisma: PrismaClient, approved: boolean) => {
    const gte = DateTime.fromJSDate(date, { zone: 'America/New_York' })
        .startOf('day')
        .toUTC()
        .toJSDate()

    const lte = DateTime.fromJSDate(gte, { zone: 'UTC' })
        .plus({ days: 1 })
        .toJSDate()

    return prisma.event.findMany({
        where: {
            startDate: {
                gte,
                lte
            },
            approved: approved ? true : undefined
        },
        include: {
            artist: true,
            venue: true
        },
        orderBy: {
            startDate: 'asc'
        }
    })
}

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
                venueId: z.string().cuid(),
                approved: z.boolean()
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
                    instagramHandle: z.string().nullable().optional(),
                    website: z.string().nullable().optional(),
                    artistId: z.string().cuid(),
                    venueId: z.string().cuid()
                })
            )
        )
        .mutation(async ({ ctx, input }) => {
            for (const row of input) {
                // if event already exists at that venue at that time
                const maybeEvent = await ctx.prisma.event.findUnique({
                    where: {
                        startDate_venueId: {
                            venueId: row.venueId,
                            startDate: row.startDate
                        }
                    },
                    include: {
                        artist: true,
                        venue: true
                    }
                })

                if (maybeEvent) {
                    // if event name or artist is the same, skip, keep artist entered event
                    if (
                        maybeEvent.artistId === row.artistId ||
                        maybeEvent.artist.name.toLowerCase() ===
                            row.name.toLowerCase()
                    ) {
                        continue
                    }
                    // if event name is different, deactive previous event and create new one
                    else {
                        console.log(
                            `Found duplicate event - ${
                                row.name
                            } - ${row.startDate.toDateString()} - ${
                                row.venueId
                            }`
                        )
                        await ctx.prisma.event.update({
                            where: { id: maybeEvent.id },
                            data: { cancelled: true }
                        })
                    }
                }

                const { artistId, venueId, ...eventData } = row
                await ctx.prisma.event.create({
                    data: {
                        ...eventData,
                        artist: { connect: { id: artistId } },
                        venue: { connect: { id: venueId } }
                    }
                })
            }
        }),

    get: publicProcedure
        .input(z.object({ id: z.string().cuid() }))
        .query(({ ctx, input }) => {
            return ctx.prisma.event.findFirst({
                where: {
                    id: input.id
                },
                include: {
                    artist: true,
                    venue: true
                }
            })
        }),

    getAll: publicProcedure
        .input(
            z.object({
                showUnapproved: z.boolean(),
                start: z.date().optional()
            })
        )
        .query(({ ctx, input }) => {
            const start = input?.start
            return ctx.prisma.event.findMany({
                include: {
                    artist: true,
                    venue: true
                },
                where: {
                    approved: input.showUnapproved ? undefined : true,
                    startDate: {
                        gte: start
                            ? DateTime.fromJSDate(start, {
                                  zone: 'America/New_York'
                              })
                                  .startOf('day')
                                  .toUTC()
                                  .toJSDate()
                            : undefined
                    }
                }
            })
        }),

    getAllByDay: publicProcedure
        .input(
            z.object({ date: z.date(), showUnapproved: z.boolean().optional() })
        )
        .query(
            async ({ ctx, input }) =>
                await getAllByDay(
                    input.date,
                    ctx.prisma,
                    input.showUnapproved ? false : true
                )
        ),

    getAllByDayByVenue: publicProcedure
        .input(z.object({ date: z.date() }))
        .query(async ({ ctx, input }) => {
            const dailyEvents = await getAllByDay(input.date, ctx.prisma, true)
            const dailyEventsByVenue: {
                venue: Venue
                events: EventWithArtistVenue[]
            }[] = []
            for (const event of dailyEvents) {
                const existingVenue = dailyEventsByVenue.find(
                    (e) => e.venue.id === event.venue.id
                )
                if (existingVenue) {
                    existingVenue.events.push(event)
                } else {
                    dailyEventsByVenue.push({
                        venue: event.venue,
                        events: [event]
                    })
                }
            }
            return dailyEventsByVenue
        }),

    getAllByMonth: publicProcedure
        .input(z.object({ month: z.number(), year: z.number() }))
        .query(({ ctx, input }) => {
            return ctx.prisma.event.findMany({
                where: {
                    startDate: {
                        gte: new Date(input.year, input.month, 1),
                        lt: new Date(input.year, input.month + 1, 1)
                    },
                    approved: true
                },
                include: {
                    artist: true,
                    venue: true
                }
            })
        }),

    getAllByArtist: publicProcedure
        .input(z.object({ artistId: z.string().cuid() }))
        .query(({ ctx, input }) => {
            return ctx.prisma.event.findMany({
                where: {
                    artistId: input.artistId
                },
                include: {
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
                cancelled: z.boolean().optional(),
                approved: z.boolean().optional(),
                description: z.string().optional()
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { id, ...eventData } = input
            return ctx.prisma.event.update({
                where: { id },
                data: { ...eventData }
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
                return await ctx.scraperService.getEvents(input.date)
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
        .input(z.object({ id: z.string().cuid(), featured: z.boolean() }))
        .mutation(async ({ ctx, input }) => {
            // First remove any other feature events
            // Only one event should be featured at a time
            if (input.featured) {
                await ctx.prisma.event.updateMany({
                    where: { featured: true },
                    data: { featured: false }
                })
            }
            return ctx.prisma.event.update({
                where: { id: input.id },
                data: { featured: input.featured }
            })
        }),

    approve: protectedProcedure
        .input(z.object({ id: z.string().cuid(), approved: z.boolean() }))
        .mutation(async ({ ctx, input }) => {
            return ctx.prisma.event.update({
                where: { id: input.id },
                data: { approved: input.approved }
            })
        }),

    emailUnapproved: protectedProcedure.mutation(async ({ ctx }) => {
        if (ctx.emailService) {
            const admins = await ctx.prisma.admin.findMany()
            const unapproved = await ctx.prisma.event.count({
                where: { approved: false, startDate: { gte: new Date() } }
            })
            for (const admin of admins) {
                await ctx.emailService.sendEmail(
                    env.EMAIL_SERVER_USER,
                    admin.email,
                    'ACTION: Unapproved Events',
                    `There are ${unapproved} unapproved events. Please visit ${env.BASE_URL}/admin/events to approve them.`
                )
            }
        }
    }),

    getUnapproved: protectedProcedure
        .input(z.object({ skip: z.number(), take: z.number() }))
        .query(async ({ ctx, input }) => {
            const unapprovedCount = await ctx.prisma.event.count({
                where: { approved: false, startDate: { gte: new Date() } }
            })
            const paginatedEvents = await ctx.prisma.event.findMany({
                where: { approved: false, startDate: { gte: new Date() } },
                include: {
                    artist: true,
                    venue: true
                },
                skip: input.skip,
                take: input.take,
                orderBy: {
                    startDate: 'asc'
                }
            })
            return { unapprovedCount, paginatedEvents }
        })
})
