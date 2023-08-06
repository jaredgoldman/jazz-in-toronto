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
            <main className="mt-5 flex min-h-screen flex-col items-center font-body">
                <Header
                    headerType={HeaderType.Admin}
                    showLinks={showHeaderLinks}
                />
                {session ? (
                    <div className="flex max-w-2xl flex-grow flex-col">
                        {children}
                    </div>
                ) : (
                    <>
                        <div className="flex max-w-2xl flex-grow flex-col">
                            <div className="text-center">
                                <p className="mt-6 text-lg">
                                    Please sign in to access the admin panel.
                                </p>
                            </div>
                        </div>
                        <Button
                            className="white absolute right-2 top-2 border p-1"
                            onClick={() => void signIn()}
                        >
                            Sign In
                        </Button>
                    </>
                )}
                <Footer />
            </main>
        </ModalProvider>
    )
}
