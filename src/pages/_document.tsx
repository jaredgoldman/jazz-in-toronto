// Components
import { Html, Head, Main, NextScript } from 'next/document'
// Config
import { env } from '../env.mjs'

export default function Document() {
    const src = `https://maps.googleapis.com/maps/api/js?key=${env.GOOGLE_API_KEY}&libraries=places`
    return (
        <Html>
            <Head>
                <script src={src} />
            </Head>
            <body className="font-body text-black dark:bg-black dark:text-white">
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
