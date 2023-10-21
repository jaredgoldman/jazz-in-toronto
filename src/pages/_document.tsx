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
                <link
                    rel="preconnect"
                    href="https://fonts.googleapis.com"
                ></link>
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                ></link>
                <link
                    href="https://fonts.googleapis.com/css2?family=Hepta+Slab:wght@400;500&display=swap"
                    rel="stylesheet"
                ></link>
                <link
                    href="https://fonts.googleapis.com/css2?family=Hepta+Slab:wght@400;500&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
                    rel="stylesheet"
                ></link>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
