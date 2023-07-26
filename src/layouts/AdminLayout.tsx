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
}
export default function AdminLayout({ children }: Props): JSX.Element {
    const { data: session } = useSession()
    return (
        <ModalProvider>
            <main>
                <Header headerType={HeaderType.Admin} />

                {session ? children : <Button onClick={signIn}>Sign In</Button>}
                <Footer />
            </main>
        </ModalProvider>
    )
}
