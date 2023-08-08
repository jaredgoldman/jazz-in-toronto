import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
    /**
     * Specify your server-side environment variables schema here. This way you can ensure the app
     * isn't built with invalid env vars.
     */
    server: {
        DATABASE_URL: z.string().url(),
        NODE_ENV: z.enum(['development', 'test', 'production']),
        GOOGLE_API_KEY: z.string(),
        FACEBOOK_CLIENT_ID: z.string(),
        FACEBOOK_CLIENT_SECRET: z.string(),
        EMAIL_SERVER_USER: z.string(),
        EMAIL_SERVER_PASSWORD: z.string(),
        EMAIL_SERVER_HOST: z.string(),
        EMAIL_SERVER_PORT: z.string(),
        EMAIL_FROM: z.string().email(),
        NEXTAUTH_SECRET: z.string(),
        UPLOADTHING_SECRET: z.string(),
        UPLOADTHING_APP_ID: z.string(),
        CMS_API_KEY: z.string(),
        CMS_API_URL: z.string(),
        CHROME_EXECUTABLE_PATH: z.string()
    },

    /**
     * Specify your client-side environment variables schema here. This way you can ensure the app
     * isn't built with invalid env vars. To expose them to the client, prefix them with
     * `NEXT_PUBLIC_`.
     */
    client: {
        NEXT_PUBLIC_CMS_API_URL: z.string()
    },

    /**
     * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
     * middlewares) or client-side so we need to destruct manually.
     */
    runtimeEnv: {
        DATABASE_URL: process.env.DATABASE_URL,
        NODE_ENV: process.env.NODE_ENV,
        GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
        FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
        FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,
        EMAIL_SERVER_USER: process.env.EMAIL_SERVER_USER,
        EMAIL_SERVER_PASSWORD: process.env.EMAIL_SERVER_PASSWORD,
        EMAIL_SERVER_HOST: process.env.EMAIL_SERVER_HOST,
        EMAIL_SERVER_PORT: process.env.EMAIL_SERVER_PORT,
        EMAIL_FROM: process.env.EMAIL_FROM,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        UPLOADTHING_SECRET: process.env.UPLOADTHING_SECRET,
        UPLOADTHING_APP_ID: process.env.UPLOADTHING_APP_ID,
        CMS_API_KEY: process.env.CMS_API_KEY,
        CMS_API_URL: process.env.CMS_API_URL,
        NEXT_PUBLIC_CMS_API_URL: process.env.NEXT_PUBLIC_CMS_API_URL,
        CHROME_EXECUTABLE_PATH: process.env.CHROME_EXECUTABLE_PATH
    },
    /**
     * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
     * This is especially useful for Docker builds.
     */
    skipValidation: !!process.env.SKIP_ENV_VALIDATION
})
