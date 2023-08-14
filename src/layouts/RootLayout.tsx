// Components
import Head from 'next/head'
import Header from '~/components/Header'
import Footer from '~/components/Footer'
// Types
import { HeaderType } from '~/components/Header/types'
import { type ReactNode } from 'react'
import { Container } from '@radix-ui/themes'
// Context

interface Props {
    children: ReactNode | string
}

export default function RootLayout({ children }: Props): JSX.Element {
    return (
        <>
            <Head>
                <title>Jazz In Toronto</title>
                <meta name="description" content="Jazz In Toronto" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="flex min-h-screen flex-col items-center font-body">
                <Header headerType={HeaderType.Public} />
                <Container size="3">{children}</Container>
                <Footer />
            </main>
        </>
    )
}
