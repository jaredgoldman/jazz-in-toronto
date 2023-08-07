// Components
import Head from 'next/head'
import Header from '~/components/Header'
import Footer from '~/components/Footer'
// Types
import { HeaderType } from '~/components/Header/types'
import { type ReactNode } from 'react'
// Context
import { ModalProvider } from '~/components/Modal/context/ModalContext'

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
            <ModalProvider>
                <main className="mt-5 flex min-h-screen flex-col items-center font-body">
                    <Header headerType={HeaderType.Public} />
                    <div className="flex max-w-2xl flex-grow flex-col">
                        {children}
                    </div>
                    <Footer />
                </main>
            </ModalProvider>
        </>
    )
}
