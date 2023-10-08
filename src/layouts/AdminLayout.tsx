// Libraries
import { signIn, useSession } from 'next-auth/react'
// Components
import Header from '~/components/Header'
import Footer from '~/components/Footer'
import { Container, Flex, Text } from '@radix-ui/themes'
import Head from 'next/head'
// Types
import { HeaderType } from '~/components/Header'
import { Button } from '@radix-ui/themes'
import { type ReactNode } from 'react'

interface Props {
    pageTitle: string
    children: ReactNode | undefined
    showHeaderLinks?: boolean
}

export default function AdminLayout({
    pageTitle,
    children,
    showHeaderLinks = true
}: Props): JSX.Element {
    const { data: session } = useSession()
    return (
        <>
            <Head>
                <title>{pageTitle}</title>
            </Head>
            <Flex direction="column" className="h-screen">
                <Header
                    headerType={HeaderType.Admin}
                    showLinks={showHeaderLinks}
                />
                <Container
                    size="3"
                    className="flex-grow overflow-x-hidden"
                    py="7"
                >
                    {session ? (
                        children
                    ) : (
                        <Flex direction="column" align="center">
                            <Text align="center" size="5" mb="5">
                                Please sign in to access the admin panel.
                            </Text>
                            <Button onClick={() => void signIn()}>
                                Sign In
                            </Button>
                        </Flex>
                    )}
                </Container>
                <Footer />
            </Flex>
        </>
    )
}
