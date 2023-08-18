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

    get: publicProcedure
        .input(z.object({ id: z.string().cuid() }))
        .query(({ ctx, input }) => {
            return ctx.prisma.artist.findUnique({
                where: { id: input.id }
            })
        }),

    getAll: publicProcedure.query(({ ctx }) => {
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
        .mutation(({ ctx, input }) => {
            const { id, ...artistData } = input
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
        .input(z.object({ id: z.string().cuid() }))
        .mutation(async ({ ctx, input }) => {
            // First remove any other features
            // Only one artist hsould be featured at a time
            await ctx.prisma.artist.updateMany({
                where: { featured: true },
                data: { featured: false }
            })
            return ctx.prisma.artist.update({
                where: { id: input.id },
                data: { featured: true }
            })
        })
})
