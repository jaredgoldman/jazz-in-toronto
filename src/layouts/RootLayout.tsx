// Components
import Head from 'next/head'
import Header from '~/components/Header'
import Footer from '~/components/Footer'
// Types
import { HeaderType } from '~/components/Header/types'
import { type ReactNode } from 'react'
import { Container, Flex } from '@radix-ui/themes'
// Context

interface Props {
    children: ReactNode | string
}

export default function RootLayout({ children }: Props): JSX.Element {
    return (
        <Flex direction="column" className="h-screen">
            <Header headerType={HeaderType.Public} />
            <div className="flex-grow">
                <Container size="3">{children}</Container>
            </div>
            <Footer />
        </Flex>
    )
}
