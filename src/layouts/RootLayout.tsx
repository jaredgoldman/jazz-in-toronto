// Components
import Header from '~/components/Header'
import Head from 'next/head'
import Footer from '~/components/Footer'
import { Container, Flex } from '@radix-ui/themes'
// Types
import { HeaderType } from '~/components/Header/'
import { type ReactNode } from 'react'
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
