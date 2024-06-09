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
        where: {
            approved: false,
            startDate: { gte: DateTime.now().toJSDate() }
        }
    })
    const unapprovedVenues = await prisma.venue.count({
        where: { approved: false }
    })
    const unapprovedArtists = await prisma.artist.count({
        where: { approved: false }
    })

    if (!unapprovedEvents && !unapprovedVenues && !unapprovedArtists) return

    const messages = []

    if (unapprovedEvents) messages.push(`${unapprovedEvents} unapproved events`)
    if (unapprovedVenues) messages.push(`${unapprovedVenues} unapproved venues`)
    if (unapprovedArtists)
        messages.push(`${unapprovedArtists} unapproved artists`)

    const lastMessage = messages[messages.length - 1] as string
    messages[messages.length - 1] = `and ${lastMessage}`

    const message = `There are ${messages.join(
        ', '
    )}. Please visit ${getBaseUrl()}admin to approve them.`.trim()

    for (const admin of admins) {
        await emailService.sendEmail(
            env.EMAIL_SERVER_USER,
            admin.email,
            "ACTION REQUIRED: Today's unapproved items",
            message
        )
    }

    return response.status(200).json({ success: true })
}
