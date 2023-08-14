import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { type AppType } from 'next/app'
import { api } from '~/utils/api'
import '~/styles/globals.css'
import { ModalProvider } from '~/components/Modal/context/ModalContext'
// Assets
import { Poppins } from 'next/font/google'
import '@radix-ui/themes/styles.css'
import { Theme } from '@radix-ui/themes'

const poppins = Poppins({
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    variable: '--body-font',
    subsets: ['latin'],
    preload: true
})

const MyApp: AppType<{ session: Session | null }> = ({
    Component,
    pageProps: { session, ...pageProps }
}) => {
    return (
        <Theme>
            <ModalProvider>
                <SessionProvider session={session}>
                    <main className={`w-full ${poppins.variable}`}>
                        <Component {...pageProps} />
                    </main>
                </SessionProvider>
            </ModalProvider>
        </Theme>
    )
}

export default api.withTRPC(MyApp)
