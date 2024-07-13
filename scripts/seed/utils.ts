import { prisma } from '~/server/db'
import { env } from '~/env.mjs'

export const generateAdmin = async () => {
    await prisma.admin.create({
        data: {
            email: env.EMAIL_SERVER_USER
        }
    })
}
