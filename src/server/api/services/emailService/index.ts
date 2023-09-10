import nodemailer from 'nodemailer'
import { env } from 'process'

export default class EmailService {
    private transport
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

    async sendEmail(
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
}
