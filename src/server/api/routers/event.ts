import { z } from "zod"
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc"

const eventSchema = z.object({
    id: z.string().cuid().optional(),
    name: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    photoPath: z.string().optional(),
    featured: z.boolean().optional(),
    instagramHandle: z.string().optional(),
    website: z.string().optional(),
    bandId: z.string().cuid(),
    venueId: z.string().cuid(),
    cancelled: z.boolean().optional(),
})

export const eventRouter = createTRPCRouter({
    create: publicProcedure.input(eventSchema).query(({ ctx, input }) => {
        const { bandId, venueId, ...eventData } = input
        return ctx.prisma.event.create({
            data: {
                ...eventData,
                band: { connect: { id: input.bandId } },
                venue: { connect: { id: input.venueId } },
            },
        })
    }),

    get: publicProcedure
        .input(z.object({ id: z.string().cuid() }))
        .query(({ ctx, input }) => {
            return ctx.prisma.event.findUnique({
                where: { id: input.id },
            })
        }),

    update: protectedProcedure.input(eventSchema).query(({ ctx, input }) => {
        const { id, ...eventData } = input
        return ctx.prisma.event.update({
            where: { id: input.id },
            data: eventData,
        })
    }),

    delete: protectedProcedure
        .input(z.object({ id: z.string().cuid() }))
        .query(({ ctx, input }) => {
            return ctx.prisma.event.delete({
                where: { id: input.id },
            })
        }),
})
