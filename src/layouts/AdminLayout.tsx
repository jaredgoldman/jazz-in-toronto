import { ReactNode, useEffect } from 'react'
import { signIn, useSession } from 'next-auth/react'
import Header from '~/components/Header'
import Footer from '~/components/Footer'
import { Container, Flex, Text } from '@radix-ui/themes'
import Head from 'next/head'
import { Button } from '@radix-ui/themes'
import { HeaderType } from '~/components/Header/utils'
import { Toast } from '~/components/Toast/Toast'
import { useAtomValue } from 'jotai'
import { toastAtom } from '~/hooks/useToast'

interface Props {
    pageTitle: string
    children: ReactNode | undefined
}

export default function AdminLayout({
    pageTitle,
    children
}: Props): JSX.Element {
    const { data: session } = useSession()
    const toastState = useAtomValue(toastAtom)

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
            </Head>
            <Flex direction="column" className="h-screen">
                {(toastState.visible || toastState.animating) && <Toast />}
                <Header headerType={HeaderType.Admin} />
                <Container className="flex-grow overflow-x-hidden" py="7">
                    {session ? (
                        children
                    ) : (
                        <Flex
                            direction="column"
                            align="center"
                            justify="center"
                        >
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
