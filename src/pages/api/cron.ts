import { prisma } from '~/server/db'
import EmailService from '~/server/api/services/emailService'
import { env } from '~/env.mjs'

export default async function handler() {
    const emailService = new EmailService()
    const admins = await prisma.admin.findMany()
    const unapproved = await prisma.event.count({
        where: { approved: false, startDate: { gte: new Date() } }
    })
    for (const admin of admins) {
        await emailService.sendEmail(
            env.EMAIL_SERVER_USER,
            admin.email,
            'ACTION: Unapproved Events',
            `There are ${unapproved} unapproved events. Please visit ${env.BASE_URL}/admin/events to approve them.`
        )
    }
}
