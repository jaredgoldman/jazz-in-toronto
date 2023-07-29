// Libraries
import { signIn, useSession } from 'next-auth/react'
// Components
import Header from '~/components/Header'
import { ModalProvider } from '~/components/Modal/context/ModalContext'
import Footer from '~/components/Footer'
// Types
import { HeaderType } from '~/components/Header/types'
import Button from '~/components/Button'

interface Props {
    children: JSX.Element | undefined
    showHeaderLinks?: boolean
}

export default function AdminLayout({
    children,
    showHeaderLinks = true
}: Props): JSX.Element {
    const { data: session } = useSession()
    return (
        <ModalProvider>
            <main>
                <Header
                    headerType={HeaderType.Admin}
                    showLinks={showHeaderLinks}
                />
                {session ? (
                    children
                ) : (
                    <Button onClick={() => void signIn()}>Sign In</Button>
                )}
                <Footer />
            </main>
        </ModalProvider>
    )
}
