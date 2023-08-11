// Libraries
import { signIn, useSession } from 'next-auth/react'
// Components
import Header from '~/components/Header'
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
        <main className="flex min-h-screen w-full flex-col items-center overflow-y-auto font-body">
            <Header headerType={HeaderType.Admin} showLinks={showHeaderLinks} />
            {session ? (
                <div className="flex min-h-[70vh] w-full flex-grow flex-col items-center">
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
                    <Button onClick={() => void signIn()}>Sign In</Button>
                </>
            )}
            <Footer />
        </main>
    )
}
