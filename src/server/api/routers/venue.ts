import { z } from 'zod'
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure
} from '~/server/api/trpc'
import { env } from '~/env.mjs'

export const venueRouter = createTRPCRouter({
    create: publicProcedure
        .input(
            z.object({
                name: z.string(),
                address: z.string(),
                city: z.string(),
                latitude: z.number(),
                longitude: z.number(),
                photoPath: z.string().optional(),
                featured: z.boolean().optional(),
                instagramHandle: z.string().optional(),
                website: z.string(),
                active: z.boolean().optional(),
                phoneNumber: z.string()
            })
        )
        .mutation(({ ctx, input }) => {
            return ctx.prisma.venue.create({
                data: input
            })
        }),

    createMany: protectedProcedure
        .input(
            z.array(
                z.object({
                    name: z.string(),
                    address: z.string(),
                    city: z.string(),
                    latitude: z.number(),
                    longitude: z.number(),
                    photoPath: z.string().nullable(),
                    featured: z.boolean().optional(),
                    instagramHandle: z.string().nullable(),
                    website: z.string(),
                    active: z.boolean().optional(),
                    phoneNumber: z.string()
                })
            )
        )
        .mutation(({ ctx, input }) => {
            return ctx.prisma.venue.createMany({
                data: input
            })
        }),

    get: publicProcedure
        .input(z.object({ id: z.string().cuid() }))
        .query(({ ctx, input }) => {
            return ctx.prisma.venue.findFirst({
                where: {
                    id: input.id,
                    approved: env.SHOW_UNAPPROVED_ITEMS ? undefined : true
                }
            })
        }),

    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.venue.findMany({
            where: {
                approved: env.SHOW_UNAPPROVED_ITEMS ? undefined : true
            }
        })
    }),

    getAllCrawlable: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.venue.findMany({
            where: {
                crawlable: true
            }
        })
    }),

    update: protectedProcedure
        .input(
            z.object({
                id: z.string().cuid(),
                name: z.string().optional(),
                address: z.string().optional(),
                city: z.string().optional(),
                latitude: z.number().optional(),
                longitude: z.number().optional(),
                photoPath: z.string().optional(),
                featured: z.boolean().optional(),
                instagramHandle: z.string().optional(),
                website: z.string().optional(),
                active: z.boolean().optional()
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { id, featured, ...venueData } = input

            if (featured) {
                await ctx.prisma.venue.updateMany({
                    where: { featured: true },
                    data: { featured: false }
                })
            }
            return ctx.prisma.venue.update({
                where: { id },
                data: venueData
            })
        }),

    delete: protectedProcedure
        .input(z.object({ id: z.string().cuid() }))
        .mutation(({ ctx, input }) => {
            return ctx.prisma.venue.delete({
                where: { id: input.id }
            })
        }),

    deletePhoto: protectedProcedure
        .input(z.object({ id: z.string().cuid() }))
        .mutation(({ ctx, input }) => {
            return ctx.prisma.venue.update({
                where: { id: input.id },
                data: { photoPath: null }
            })
        }),

    getFeatured: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.venue.findFirst({
            where: { featured: true }
        })
    }),

    setFeatured: protectedProcedure
        .input(z.object({ id: z.string().cuid() }))
        .mutation(async ({ ctx, input }) => {
            // First remove any other features
            // Only one band hsould be featured at a time
            await ctx.prisma.venue.updateMany({
                where: { featured: true },
                data: { featured: false }
            })
            return ctx.prisma.venue.update({
                where: { id: input.id },
                data: { featured: true }
            })
        })
})
