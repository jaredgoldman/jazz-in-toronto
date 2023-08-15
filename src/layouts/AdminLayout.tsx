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
        <Flex direction="column" className="h-screen">
            <Header headerType={HeaderType.Admin} showLinks={showHeaderLinks} />
            <Container size="3" className="flex-grow">
                {session ? (
                    children
                ) : (
                    <Flex direction="column" align="center">
                        <Text align="center" size="5" mb="5">
                            Please sign in to access the admin panel.
                        </Text>
                        <Button onClick={() => void signIn()}>Sign In</Button>
                    </Flex>
                )}
            </Container>
            <Footer />
        </Flex>
    )
}
