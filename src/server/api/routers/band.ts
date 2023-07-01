import { z } from "zod"
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc"

export const bandRouter = createTRPCRouter({
    create: publicProcedure
        .input(
            z.object({
                name: z.string(),
                genre: z.string().optional(),
                photoPath: z.string().optional(),
                featured: z.boolean().optional(),
                instagramHandle: z.string().optional(),
                website: z.string().optional(),
            })
        )
        .query(({ ctx, input }) => {
            return ctx.prisma.band.create({
                data: input,
            })
        }),

    get: publicProcedure
        .input(z.object({ id: z.string().cuid() }))
        .query(({ ctx, input }) => {
            return ctx.prisma.band.findUnique({
                where: { id: input.id },
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
                website: z.string().optional(),
            })
        )
        .query(({ ctx, input }) => {
            const { id, ...bandData } = input
            return ctx.prisma.band.update({
                where: { id: input.id },
                data: bandData,
            })
        }),

    delete: protectedProcedure
        .input(z.object({ id: z.string().cuid() }))
        .query(({ ctx, input }) => {
            return ctx.prisma.band.delete({
                where: { id: input.id },
            })
        }),
})
