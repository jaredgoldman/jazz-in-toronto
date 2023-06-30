import { z } from "zod"
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc"

const venueSchema = z.object({
    id: z.string().cuid().optional(),
    name: z.string(),
    address: z.string(),
    city: z.string(),
    photoPath: z.string().optional(),
    featured: z.boolean().optional(),
    instagramHandle: z.string().optional(),
    website: z.string().optional(),
    active: z.boolean().optional(),
})

export const venueRouter = createTRPCRouter({
    create: publicProcedure.input(venueSchema).query(({ ctx, input }) => {
        return ctx.prisma.venue.create({
            data: input,
        })
    }),

    get: publicProcedure
        .input(z.object({ id: z.string().cuid() }))
        .query(({ ctx, input }) => {
            return ctx.prisma.venue.findUnique({
                where: { id: input.id },
            })
        }),

    update: protectedProcedure.input(venueSchema).query(({ ctx, input }) => {
        const { id, ...venueData } = input
        return ctx.prisma.venue.update({
            where: { id: input.id },
            data: venueData,
        })
    }),

    delete: protectedProcedure
        .input(z.object({ id: z.string().cuid() }))
        .query(({ ctx, input }) => {
            return ctx.prisma.venue.delete({
                where: { id: input.id },
            })
        }),
})
