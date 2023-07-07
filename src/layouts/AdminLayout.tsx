import Header from "~/components/Header"
import { ModalProvider } from "~/components/Modal/context/ModalContext"
import { HeaderType } from "~/components/Header/types"
import Footer from "~/components/Footer"

interface Props {
    children: JSX.Element
}
export default function AdminLayout({ children }: Props): JSX.Element {
    return (
            <ModalProvider>
                <main>
                    <Header headerType={HeaderType.Admin}/>
                    {children}
                    <Footer />
                </main>
            </ModalProvider>
    )
}