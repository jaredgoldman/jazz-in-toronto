// Libraries
import { z } from 'zod'
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure
} from '~/server/api/trpc'

export const artistRouter = createTRPCRouter({
    create: publicProcedure
        .input(
            z.object({
                name: z.string(),
                genre: z.string().optional(),
                photoPath: z.string().optional(),
                featured: z.boolean().optional(),
                instagramHandle: z.string().optional(),
                website: z.string().optional()
            })
        )
        .mutation(({ ctx, input }) => {
            return ctx.prisma.artist.create({
                data: input
            })
        }),

    createMany: protectedProcedure
        .input(
            z.array(
                z.object({
                    name: z.string(),
                    genre: z.string().nullable(),
                    photoPath: z.string().nullable(),
                    featured: z.boolean().optional(),
                    instagramHandle: z.string().nullable().optional(),
                    website: z.string().nullable().optional()
                })
            )
        )
        .mutation(({ ctx, input }) => {
            return ctx.prisma.artist.createMany({
                data: input
            })
        }),

    get: publicProcedure
        .input(z.object({ id: z.string().cuid() }))
        .query(({ ctx, input }) => {
            return ctx.prisma.artist.findFirst({
                where: {
                    id: input.id,
                    approved: true
                }
            })
        }),

    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.artist.findMany({
            where: {
                approved: true
            }
        })
    }),

    getAllAdmin: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.artist.findMany()
    }),

    update: protectedProcedure
        .input(
            z.object({
                id: z.string().cuid(),
                name: z.string().optional(),
                genre: z.string().optional(),
                photoPath: z.string().optional(),
                featured: z.boolean().optional(),
                instagramHandle: z.string().optional(),
                website: z.string().optional()
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { id, featured, ...artistData } = input
            if (featured) {
                await ctx.prisma.artist.updateMany({
                    where: { featured: true },
                    data: { featured: false }
                })
            }
            return ctx.prisma.artist.update({
                where: { id },
                data: artistData
            })
        }),

    delete: protectedProcedure
        .input(z.object({ id: z.string().cuid() }))
        .mutation(({ ctx, input }) => {
            return ctx.prisma.artist.delete({
                where: { id: input.id }
            })
        }),

    deletePhoto: protectedProcedure
        .input(z.object({ id: z.string().cuid() }))
        .mutation(({ ctx, input }) => {
            return ctx.prisma.artist.update({
                where: { id: input.id },
                data: { photoPath: null }
            })
        }),

    getFeatured: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.artist.findFirst({
            where: { featured: true }
        })
    }),

    setFeatured: protectedProcedure
        .input(z.object({ id: z.string().cuid(), featured: z.boolean() }))
        .mutation(async ({ ctx, input }) => {
            // First remove any other featured artists
            // Only one artist should be featured at a time
            if (input.featured) {
                await ctx.prisma.artist.updateMany({
                    where: { featured: true },
                    data: { featured: false }
                })
            }
            return ctx.prisma.artist.update({
                where: { id: input.id },
                data: { featured: input.featured }
            })
        }),

    approve: protectedProcedure
        .input(z.object({ id: z.string().cuid(), approved: z.boolean() }))
        .mutation(async ({ ctx, input }) => {
            return ctx.prisma.artist.update({
                where: { id: input.id },
                data: { approved: input.approved }
            })
        })
})
