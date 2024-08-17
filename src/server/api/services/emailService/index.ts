import nodemailer from 'nodemailer'
import { env } from '~/env.mjs'
import { Artist, Event, Venue } from '@prisma/client'

/**
 * A service for sending emails
 * @class
 * @classdesc A service for sending emails
 * @exports EmailService
 * @requires nodemailer
 */
export default class EmailService {
    private transport
    private adminEmail = env.EMAIL_SERVER_USER
    constructor() {
        this.transport = nodemailer.createTransport({
            host: env.EMAIL_SERVER_HOST,
            port: Number(env.EMAIL_SERVER_PORT),
            auth: {
                user: env.EMAIL_SERVER_USER,
                pass: env.EMAIL_SERVER_PASSWORD
            }
        })
    }

    /**
     * Send an email
     * @param {string} from The email address to send from
     * @param {string} to The email address to send to
     * @param {string} subject The email subject
     * @param {string} text The email body as plain text
     * @param {string} html The email body as HTML
     */
    public async sendEmail(
        from: string,
        to: string,
        subject?: string,
        text?: string,
        html?: string
    ) {
        await this.transport.sendMail({
            from,
            to,
            subject,
            text,
            html
        })
    }

    /**
     * Send an email indicating that an item is pending approval
     * @param {string} to The email address to send to
     * @param {'Artist' | 'Event' | 'Venue'} type The type of item
     * @param {Artist | Event | Venue} item The item to approve
     */
    public async sendPendingApprovalEmail(
        to: string,
        type: 'Artist' | 'Event' | 'Venue',
        item: Artist | Event | Venue
    ) {
        await this.sendEmail(
            this.adminEmail,
            to,
            `Jazz In Toronto: ${type} Pending Approval`,
            `Your request to add ${type.toLowerCase()}: "${
                item.name
            }" is pending approval. We'll send you an email once it's approved.

Best Regards,
Jazz In Toronto team
https://jazzintoronto.ca`
        )
    }

    /**
     * Send an email indicating that an item has been approved
     * @param {string} to The email address to send to
     * @param {'Artist' | 'Event' | 'Venue'} type The type of item
     * @param {Artist | Event | Venue} item The item to approve
     */
    public async sendApprovedEmail(
        to: string,
        type: 'Artist' | 'Event' | 'Venue',
        item: Artist | Event | Venue
    ) {
        await this.sendEmail(
            this.adminEmail,
            to,
            `Jazz In Toronto: ${type} Approved!`,
            `Your request to add ${type.toLowerCase()}: "${
                item.name
            }" has been approved and now live on the site!

Best Regards,
Jazz In Toronto team
https://jazzintoronto.ca`
        )
    }
}
