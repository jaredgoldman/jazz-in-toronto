// Libraries
import { z } from 'zod'
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure
} from '~/server/api/trpc'

export const userRouter = createTRPCRouter({
    create: publicProcedure
        .input(
            z.object({
                email: z.string().email(),
                password: z.string().min(8).max(100)
            })
        )
        .mutation(({ ctx, input }) => {
            return ctx.prisma.user.create({
                data: input
            })
        }),

    get: publicProcedure
        .input(z.object({ id: z.string().cuid() }))
        .query(({ ctx, input }) => {
            return ctx.prisma.band.findUnique({
                where: { id: input.id }
            })
        }),

    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.band.findMany()
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
            const { id, ...bandData } = input
            return ctx.prisma.band.update({
                where: { id: input.id },
                data: bandData
            })
        }),

    delete: protectedProcedure
        .input(z.object({ id: z.string().cuid() }))
        .mutation(({ ctx, input }) => {
            return ctx.prisma.band.delete({
                where: { id: input.id }
            })
        })
})
