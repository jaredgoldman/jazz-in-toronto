import { z } from "zod"
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure
} from "~/server/api/trpc"

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
        })
})
