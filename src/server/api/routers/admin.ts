import { z } from "zod"
import { adminRoles } from "~/types/enums"
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc"
import { TRPCError } from "@trpc/server"

export const adminRouter = createTRPCRouter({
    create: protectedProcedure
        .input(
            z.object({
                name: z.string().optional(),
                email: z.string(),
                password: z.string(),
            })
        )
        .query(async ({ ctx, input }) => {
            const user = await ctx.prisma.admin.findUnique({
                where: {
                    id: ctx.session.user.id,
                },
            })
            if (user?.role === adminRoles.SUPER_ADMIN) {
                return ctx.prisma.admin.create({
                    data: input,
                })
            } else {
                throw new TRPCError({ code: "UNAUTHORIZED" })
            }
        }),

    get: protectedProcedure
        .input(z.object({ id: z.string().cuid() }))
        .query(async ({ ctx, input }) => {
            const user = await ctx.prisma.admin.findUnique({
                where: {
                    id: ctx.session.user.id,
                },
            })
            if (
                ctx.session?.user.id === input.id ||
                user?.role === adminRoles.SUPER_ADMIN
            ) {
                return ctx.prisma.admin.findUnique({
                    where: { id: input.id },
                })
            } else {
                throw new TRPCError({ code: "UNAUTHORIZED" })
            }
        }),

    update: protectedProcedure
        .input(
            z.object({
                id: z.string().cuid(),
                name: z.string().optional(),
                email: z.string().optional(),
                password: z.string().optional(),
                role: z.string().optional(),
            })
        )
        .query(async ({ ctx, input }) => {
            const user = await ctx.prisma.admin.findUnique({
                where: {
                    id: ctx.session.user.id,
                },
            })

            const { id, ...adminData } = input

            const isSuper = user?.role === adminRoles.SUPER_ADMIN
            const editingSelf = user?.id === id
            const isEditingRole =
                adminData.role && adminData.role === user?.role ? true : false
            // Only SUPER_ADMINs can edit admin roles
            if (isSuper || (editingSelf && !isEditingRole)) {
                return ctx.prisma.admin.update({
                    where: { id: input.id },
                    data: adminData,
                })
            } else {
                throw new TRPCError({ code: "UNAUTHORIZED" })
            }
        }),

    delete: protectedProcedure
        .input(z.object({ id: z.string().cuid() }))
        .query(async ({ ctx, input }) => {
            const user = await ctx.prisma.admin.findUnique({
                where: {
                    id: ctx.session.user.id,
                },
            })
            if (user?.role === adminRoles.SUPER_ADMIN) {
                return ctx.prisma.admin.delete({
                    where: { id: input.id },
                })
            } else {
                throw new TRPCError({ code: "UNAUTHORIZED" })
            }
        }),
})
