import { z } from 'zod'
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure
} from '~/server/api/trpc'
import { Genre } from '@prisma/client'
import { utapi } from 'uploadthing/server'

const genreEnumValues = [...Object.values(Genre)] as [Genre, ...Genre[]]
const artistValidation = z.object({
    name: z.string(),
    genre: z.enum(genreEnumValues).optional(),
    photoPath: z.string().optional(),
    photoName: z.string().optional(),
    featured: z.boolean().optional(),
    instagramHandle: z.string().optional(),
    website: z.string().optional(),
    approved: z.boolean()
})

export const artistRouter = createTRPCRouter({
    create: publicProcedure
        .input(artistValidation)
        .mutation(({ ctx, input }) => {
            return ctx.prisma.artist.create({
                data: input
            })
        }),

    createMany: protectedProcedure
        .input(z.array(artistValidation))
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
                    id: input.id
                }
            })
        }),

    getAll: publicProcedure
        .input(z.object({ showUnapproved: z.boolean() }).optional())
        .query(({ ctx, input }) => {
            return ctx.prisma.artist.findMany({
                where: {
                    approved: input?.showUnapproved ? undefined : true
                }
            })
        }),

    update: protectedProcedure
        .input(
            z.object({
                id: z.string().cuid(),
                name: z.string().optional(),
                genre: z.enum(genreEnumValues).optional(),
                photoPath: z.string().optional(),
                photoName: z.string().optional(),
                featured: z.boolean().optional(),
                instagramHandle: z.string().optional(),
                website: z.string().optional(),
                description: z.string().optional()
            })
        )
        .mutation(async ({ ctx, input }) => {
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
        .input(z.object({ id: z.string().cuid(), fileKey: z.string() }))
        .mutation(async ({ ctx, input }) => {
            try {
                const res = await utapi.deleteFiles(input.fileKey)
                if ('deletedCount' in res && res.deletedCount === 0) {
                    console.log({
                        deletedCount: res.deletedCount,
                        fileKey: input.fileKey
                    })
                    console.warn(`File not found: ${input.fileKey}`)
                }
                return ctx.prisma.artist.update({
                    where: { id: input.id },
                    data: { photoPath: null }
                })
            } catch (error: unknown) {
                throw new Error(`Error deleting file: ${String(error)}`)
            }
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
        }),

    approveMany: protectedProcedure
        .input(z.array(z.string().cuid()))
        .mutation(async ({ ctx, input }) => {
            return ctx.prisma.artist.updateMany({
                where: { id: { in: input } },
                data: { approved: true }
            })
        })
})
