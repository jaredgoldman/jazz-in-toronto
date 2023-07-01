import { expect, it, describe, beforeAll, afterAll } from "vitest"
import { type RouterInputs } from "~/utils/api"
import { appRouter } from "~/server/api/root"
import { createInnerTRPCContext } from "~/server/api/trpc"
import { adminRoles } from "~/types/enums"
import { prisma } from "~/server/db"
import { Admin } from "@prisma/client"
import { TRPCError } from "@trpc/server"

const adminData = {
    email: "testadmin@test.com",
    password: "password",
}

const superAdminData = {
    email: "testsuperadmin@test.com",
    password: "password",
    role: adminRoles.SUPER_ADMIN,
}

const otherAdminData = {
    email: "otheradmin@test.com",
    password: "password",
}

let admin: Admin
let superAdmin: Admin
let otherAdmin: Admin

beforeAll(async () => {
    // admin = await prisma.admin.create({ data: adminData })
    superAdmin = await prisma.admin.create({ data: superAdminData })
    otherAdmin = await prisma.admin.create({ data: otherAdminData })
})

describe("Admin Router", () => {
    // CREATE
    it("should allow a super admin to create an admin user", async () => {
        const ctx = createInnerTRPCContext({
            session: {
                user: {
                    id: superAdmin.id,
                },
                expires: "1",
            },
        })
        const caller = appRouter.createCaller(ctx)

        const input: RouterInputs["admin"]["create"] = adminData

        admin = (await caller.admin.create(input)) as Admin

        const query = await prisma.admin.findMany({
            where: { email: adminData.email },
        })
        expect(query.length).toEqual(1)
    })

    it("should not allow a regular admin to create an admin user", async () => {
        const ctx = createInnerTRPCContext({
            session: {
                user: {
                    id: admin.id,
                },
                expires: "1",
            },
        })
        const caller = appRouter.createCaller(ctx)

        const input: RouterInputs["admin"]["create"] = {
            email: "eviladmin@test.com",
            password: "password",
        }

        let res
        try {
            res = await caller.admin.create(input)
        } catch (error) {
            expect(error).toStrictEqual(new TRPCError({ code: "UNAUTHORIZED" }))
            expect(res).toBeUndefined()
        }
    })

    it("should not allow an unauthorized user to create an admin user", async () => {
        const ctx = createInnerTRPCContext({
            session: null,
        })
        const caller = appRouter.createCaller(ctx)

        const input: RouterInputs["admin"]["create"] = {
            email: "eviladmin@test.com",
            password: "password",
        }

        let res
        try {
            res = await caller.admin.create(input)
        } catch (error) {
            expect(error).toStrictEqual(new TRPCError({ code: "UNAUTHORIZED" }))
            expect(res).toBeUndefined()
        }
    })

    // READ
    it("should allow an super admins to fetch other admins data", async () => {
        const ctx = createInnerTRPCContext({
            session: {
                user: {
                    id: superAdmin.id,
                },
                expires: "1",
            },
        })
        const caller = appRouter.createCaller(ctx)

        const input: RouterInputs["admin"]["get"] = { id: admin.id }
        const otherInput: RouterInputs["admin"]["get"] = { id: otherAdmin.id }

        const fetchedAdmin = await caller.admin.get(input)
        expect(fetchedAdmin).toStrictEqual(admin)
        const otherFetchedAdmin = await caller.admin.get(otherInput)
        expect(otherFetchedAdmin).toStrictEqual(otherAdmin)
    })

    it("should allow an admin user fetch their own data", async () => {
        const ctx = createInnerTRPCContext({
            session: {
                user: {
                    id: admin.id,
                },
                expires: "1",
            },
        })
        const caller = appRouter.createCaller(ctx)

        const input: RouterInputs["admin"]["get"] = { id: admin.id }

        const fetchedAdmin = await caller.admin.get(input)
        expect(fetchedAdmin).toStrictEqual(admin)
    })

    it("should not allow an admin user to fetch other admins data", async () => {
        const ctx = createInnerTRPCContext({
            session: {
                user: {
                    id: admin.id,
                },
                expires: "1",
            },
        })
        const caller = appRouter.createCaller(ctx)

        const input: RouterInputs["admin"]["get"] = { id: superAdmin.id }

        let res
        try {
            res = await caller.admin.get(input)
        } catch (error) {
            expect(error).toStrictEqual(new TRPCError({ code: "UNAUTHORIZED" }))
            expect(res).toBeUndefined()
        }
    })

    it("should not allow an unauthorized user to fetch admin data", async () => {
        const ctx = createInnerTRPCContext({
            session: null,
        })
        const caller = appRouter.createCaller(ctx)

        const input: RouterInputs["admin"]["get"] = { id: superAdmin.id }

        let res
        try {
            res = await caller.admin.get(input)
        } catch (error) {
            expect(error).toStrictEqual(new TRPCError({ code: "UNAUTHORIZED" }))
            expect(res).toBeUndefined()
        }
    })

    // UPDATE
    it("should allow a super admin to update an admin user", async () => {
        const ctx = createInnerTRPCContext({
            session: {
                user: {
                    id: superAdmin.id,
                },
                expires: "1",
            },
        })
        const caller = appRouter.createCaller(ctx)

        const input: RouterInputs["admin"]["update"] = {
            id: admin.id,
            email: "updatedemail@test.com",
        }

        await caller.admin.update(input)

        const query = await prisma.admin.findUnique({
            where: { email: input.email },
        })

        expect(query?.email).toEqual(input.email)
    })

    it("should allow an admin user to update themselves but not other admins", async () => {
        const ctx = createInnerTRPCContext({
            session: {
                user: {
                    id: admin.id,
                },
                expires: "1",
            },
        })
        const caller = appRouter.createCaller(ctx)
        const updateSelfInput: RouterInputs["admin"]["update"] = {
            id: admin.id,
            email: "updatedemail@test.com",
        }

        const query = await caller.admin.update(updateSelfInput)

        expect(query.email).toEqual(updateSelfInput.email)

        const updateOtherInput: RouterInputs["admin"]["update"] = {
            id: otherAdmin.id,
            email: "updatedemail@test.com",
        }

        let res
        try {
            res = await caller.admin.update(updateOtherInput)
        } catch (error) {
            expect(error).toStrictEqual(new TRPCError({ code: "UNAUTHORIZED" }))
            expect(res).toBeUndefined()
        }
    })

    it("should not allow an admin user to change their role", async () => {
        const ctx = createInnerTRPCContext({
            session: {
                user: {
                    id: admin.id,
                },
                expires: "1",
            },
        })
        const caller = appRouter.createCaller(ctx)
        const input: RouterInputs["admin"]["update"] = {
            id: admin.id,
            email: "updatedemail@test.com",
            role: adminRoles.SUPER_ADMIN,
        }

        let res
        try {
            admin = await caller.admin.update(input)
        } catch (error) {
            expect(error).toStrictEqual(new TRPCError({ code: "UNAUTHORIZED" }))
            expect(res).toBeUndefined()
        }
    })

    // DELETE
    it("should allow a super admin to delete an admin user", async () => {
        const ctx = createInnerTRPCContext({
            session: {
                user: {
                    id: superAdmin.id,
                },
                expires: "1",
            },
        })
        const caller = appRouter.createCaller(ctx)

        const input: RouterInputs["admin"]["delete"] = { id: admin.id }

        const deletedadmin = await caller.admin.delete(input)

        expect(deletedadmin.id).toEqual(admin.id)
    })

    it("should not allow an admin to delete another admin user", async () => {
        const ctx = createInnerTRPCContext({
            session: {
                user: {
                    id: otherAdmin.id,
                },
                expires: "1",
            },
        })
        const caller = appRouter.createCaller(ctx)

        const input: RouterInputs["admin"]["delete"] = { id: admin.id }

        let res
        try {
            res = await caller.admin.delete(input)
        } catch (error) {
            expect(error).toStrictEqual(new TRPCError({ code: "UNAUTHORIZED" }))
            expect(res).toBeUndefined()
        }
    })

    it("should not allow an unauthorized user to delete another admin user", async () => {
        const ctx = createInnerTRPCContext({
            session: null,
        })
        const caller = appRouter.createCaller(ctx)

        const input: RouterInputs["admin"]["delete"] = { id: admin.id }

        let res
        try {
            res = await caller.admin.delete(input)
        } catch (error) {
            expect(error).toStrictEqual(new TRPCError({ code: "UNAUTHORIZED" }))
            expect(res).toBeUndefined()
        }
    })
})

afterAll(async () => {
    await prisma.admin.delete({
        where: {
            id: superAdmin.id,
        },
    })
    await prisma.admin.delete({
        where: {
            id: otherAdmin.id,
        },
    })
})
