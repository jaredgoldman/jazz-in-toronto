/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import('./src/env.mjs')

/** @type {import("next").NextConfig} */
const config = {
    reactStrictMode: true,

    /**
     * If you have `experimental: { appDir: true }` set, then you must comment the below `i18n` config
     * out.
     *
     * @see https://github.com/vercel/next.js/issues/41980
     */
    i18n: {
        locales: ['en'],
        defaultLocale: 'en'
    },
    experimental: { esmExternals: false },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'uploadthing.com',
                pathname: '/f/**'
            },
            {
                protocol: 'https',
                hostname: 'utfs.io',
                pathname: '/f/**'
            },

            {
                protocol: 'https',
                hostname: 'picsum.photos'
            },
            {
                protocol: 'http',
                hostname: '127.0.0.1',
                pathname: '/uploads/**'
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '/**'
            }
        ]
    }
}

export default config
