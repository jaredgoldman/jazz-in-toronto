// Components
import { Html, Head, Main, NextScript } from 'next/document'
// Config
import { env } from '../env.mjs'

export default function Document() {
    const src = `https://maps.googleapis.com/maps/api/js?key=${env.GOOGLE_API_KEY}&libraries=places`
    return (
        <Html>
            <Head>
                <meta name="description" content="Jazz In Toronto" />
                <script async src={src} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
