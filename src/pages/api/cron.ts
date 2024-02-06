import { prisma } from '~/server/db'
import EmailService from '~/server/api/services/emailService'
import { env } from '~/env.mjs'

export default async function handler() {
    const emailService = new EmailService()
    const admins = await prisma.admin.findMany()
    const unapprovedEvents = await prisma.event.count({
        where: { approved: false, startDate: { gte: new Date() } }
    })
    const unapprovedVenues = await prisma.venue.count({
        where: { approved: false }
    })
    const unapprovedArtists = await prisma.artist.count({
        where: { approved: false }
    })

    for (const admin of admins) {
        await emailService.sendEmail(
            env.EMAIL_SERVER_USER,
            admin.email,
            'ACTION: Unapproved Events',
            `There are ${unapprovedEvents} unapproved events, ${unapprovedVenues} unapproved venues, and ${unapprovedArtists} unapproved artists.
             Please visit ${env.BASE_URL}/admin/events to approve them.`
        )
    }
}
