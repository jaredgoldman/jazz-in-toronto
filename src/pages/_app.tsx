// Components
import { SessionProvider } from 'next-auth/react'
// Types
import { type Session } from 'next-auth'
import { type AppType } from 'next/app'
// Utils
import { api } from '~/utils/api'
// Assets
import '~/styles/globals.css'
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
            <SessionProvider session={session}>
                <main className={`w-full ${poppins.variable}`}>
                    <Component {...pageProps} />
                </main>
            </SessionProvider>
        </Theme>
    )
}

export default api.withTRPC(MyApp)
