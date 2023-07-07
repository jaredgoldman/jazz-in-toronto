import Head from "next/head"
import Header from "~/components/Header"
import Footer from "~/components/Footer"
import {
    ModalProvider,
} from "~/components/Modal/context/ModalContext"
import { HeaderType } from "~/components/Header/types"

interface Props {
    children: JSX.Element | string
}
export default function RootLayout({ children }: Props): JSX.Element {
    return (
        <>
            <Head>
                <title>Jazz In Toronto</title>
                <meta name="description" content="Jazz In Toronto" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ModalProvider>
                <main>
                    <Header headerType={HeaderType.Public}/>
                    {children}
                    <Footer />
                </main>
            </ModalProvider>
        </>
    )
}
