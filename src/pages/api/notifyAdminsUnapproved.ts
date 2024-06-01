import { prisma } from '~/server/db'
import EmailService from '~/server/api/services/emailService'
import { getBaseUrl } from '~/utils/api'
import { env } from '~/env.mjs'
import { NextApiRequest, NextApiResponse } from 'next'
import { DateTime } from 'luxon'

export default async function handler(
    _request: NextApiRequest,
    response: NextApiResponse
) {
    const emailService = new EmailService()
    const admins = await prisma.admin.findMany()
    const unapprovedEvents = await prisma.event.count({
        where: { approved: false, startDate: { gte: DateTime.now().toJSDate() } }
    })
    const unapprovedVenues = await prisma.venue.count({
        where: { approved: false }
    })
    const unapprovedArtists = await prisma.artist.count({
        where: { approved: false }
    })

    if (!unapprovedEvents && !unapprovedVenues && !unapprovedArtists) return

    for (const admin of admins) {
        await emailService.sendEmail(
            env.EMAIL_SERVER_USER,
            admin.email,
            'JazzInToronto: ACTION REQUIRED - Unapproved Items',
            `There are ${unapprovedEvents} unapproved events,
            ${unapprovedVenues} unapproved venues, and ${unapprovedArtists} unapproved artists. Please visit ${getBaseUrl()}/admin to approve them.`
        )
    }

    return response.status(200).json({ success: true })
}
