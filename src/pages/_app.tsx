import { ThemeProvider } from 'next-themes'
// Components
import { SessionProvider } from 'next-auth/react'
// Types
import { type Session } from 'next-auth'
import { type AppType } from 'next/app'
// Utils
import { api } from '~/utils/api'
// Assets
import { Poppins } from 'next/font/google'
import { Theme, ThemePanel } from '@radix-ui/themes'
import '~/styles/globals.css'
import '@radix-ui/themes/styles.css'

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
    const showPanel = false

    return (
        <ThemeProvider attribute="class">
            <Theme accentColor="orange" radius="medium" appearance="dark">
                <SessionProvider session={session}>
                    <main className={`w-full ${poppins.variable}`}>
                        <Component {...pageProps} />
                    </main>
                </SessionProvider>
                {showPanel && <ThemePanel />}
            </Theme>
        </ThemeProvider>
    )
}

export default api.withTRPC(MyApp)
