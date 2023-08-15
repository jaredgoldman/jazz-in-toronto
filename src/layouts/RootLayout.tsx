// Components
import Header from '~/components/Header'
import Footer from '~/components/Footer'
// Types
import { HeaderType } from '~/components/Header/types'
import { type ReactNode } from 'react'
import { Container, Flex } from '@radix-ui/themes'
import Head from 'next/head'
// Context

interface Props {
    pageTitle: string
    children: ReactNode | string
}

export default function RootLayout({
    children,
    pageTitle
}: Props): JSX.Element {
    return (
        <>
            <Head>
                <title>{pageTitle}</title>
            </Head>
            <Flex direction="column" className="h-screen">
                <Header headerType={HeaderType.Public} />
                <Container size="3" className="flex-grow">
                    {children}
                </Container>
                <Footer />
            </Flex>
        </>
    )
}
