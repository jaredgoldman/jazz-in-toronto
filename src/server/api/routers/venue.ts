import { z } from 'zod'
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure
} from '~/server/api/trpc'
import { utapi } from 'uploadthing/server'

const venueValidation = z.object({
    name: z.string(),
    address: z.string(),
    city: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    photoPath: z.string().optional(),
    photoName: z.string().optional(),
    featured: z.boolean().optional(),
    instagramHandle: z.string().optional(),
    website: z.string(),
    active: z.boolean().optional(),
    phoneNumber: z.string(),
    description: z.string().optional(),
    isApproved: z.boolean().optional()
})

export const venueRouter = createTRPCRouter({
    create: publicProcedure
        .input(venueValidation)
        .mutation(({ ctx, input }) => {
            const { isApproved, ...venueData } = input
            return ctx.prisma.venue.create({
                data: { ...venueData, approved: isApproved ?? false }
            })
        }),

    createMany: protectedProcedure
        .input(z.array(venueValidation))
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
                    id: input.id
                }
            })
        }),

    getAll: publicProcedure
        .input(z.object({ showUnapproved: z.boolean() }).optional())
        .query(({ ctx, input }) => {
            return ctx.prisma.venue.findMany({
                where: {
                    approved: input?.showUnapproved ? undefined : true
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
                photoName: z.string().optional(),
                featured: z.boolean().optional(),
                instagramHandle: z.string().optional(),
                website: z.string().optional(),
                active: z.boolean().optional(),
                description: z.string().optional()
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { id, ...venueData } = input
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
        .input(z.object({ id: z.string().cuid(), fileKey: z.string() }))
        .mutation(async ({ ctx, input }) => {
            try {
                const res = await utapi.deleteFiles(input.fileKey)
                if ('deletedCount' in res && !res.deletedCount) {
                    throw new Error(`File not found: ${input.fileKey}`)
                }
                return ctx.prisma.venue.update({
                    where: { id: input.id },
                    data: { photoPath: null }
                })
            } catch (error: unknown) {
                throw new Error(`Error deleting file: ${String(error)}`)
            }
        }),

    getFeatured: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.venue.findFirst({
            where: { featured: true }
        })
    }),

    setFeatured: protectedProcedure
        .input(z.object({ id: z.string().cuid(), featured: z.boolean() }))
        .mutation(async ({ ctx, input }) => {
            // If item is featured, remove other featured items
            // Only one venue should be featured at a time
            if (input.featured) {
                await ctx.prisma.venue.updateMany({
                    where: { featured: true },
                    data: { featured: false }
                })
            }
            return ctx.prisma.venue.update({
                where: { id: input.id },
                data: { featured: input.featured }
            })
        }),

    approve: protectedProcedure
        .input(z.object({ id: z.string().cuid(), approved: z.boolean() }))
        .mutation(async ({ ctx, input }) => {
            return ctx.prisma.venue.update({
                where: { id: input.id },
                data: { approved: input.approved }
            })
        })
})
