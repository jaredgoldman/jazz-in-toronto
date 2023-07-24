// Components
import Header from '~/components/Header'
import { ModalProvider } from '~/components/Modal/context/ModalContext'
import Footer from '~/components/Footer'
// Types
import { HeaderType } from '~/components/Header/types'

interface Props {
    children: JSX.Element | undefined
}
export default function AdminLayout({ children }: Props): JSX.Element {
    // const isAuthenticatedAdmin = false

    return (
        <ModalProvider>
            <main>
                <Header headerType={HeaderType.Admin} />
                {children}
                <Footer />
            </main>
        </ModalProvider>
    )
}
