// Libraries
import { signIn, useSession } from 'next-auth/react'
// Components
import Header from '~/components/Header'
import Footer from '~/components/Footer'
import { Container, Flex, Text } from '@radix-ui/themes'
// Types
import { HeaderType } from '~/components/Header/types'
import { Button } from '@radix-ui/themes'
import { ReactNode } from 'react'

interface Props {
    children: ReactNode | undefined
    showHeaderLinks?: boolean
}

export default function AdminLayout({
    children,
    showHeaderLinks = true
}: Props): JSX.Element {
    const { data: session } = useSession()
    return (
        <Container>
            <Flex direction="column">
                <Header
                    headerType={HeaderType.Admin}
                    showLinks={showHeaderLinks}
                />
                {session ? (
                    <Container size="3">{children}</Container>
                ) : (
                    <>
                        <Flex direction="column">
                            <Text align="center" size="5">
                                Please sign in to access the admin panel.
                            </Text>
                        </Flex>
                        <Button onClick={() => void signIn()}>Sign In</Button>
                    </>
                )}
                <Footer />
            </Flex>
        </Container>
    )
}
