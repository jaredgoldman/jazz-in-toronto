import { ThemeProvider } from 'next-themes'
// Components
import { SessionProvider } from 'next-auth/react'
// Types
import { Session } from 'next-auth'
import { AppType } from 'next/app'
// Utils
import { api } from '~/utils/api'
// Assets
import { Poppins } from 'next/font/google'
import '~/styles/globals.css'
import '@radix-ui/themes/styles.css'
import '../styles/theme-config.css'

import { Theme, ThemePanel } from '@radix-ui/themes'

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
                    <main
                        className={`w-full ${poppins.variable}`}
                        suppressHydrationWarning
                    >
                        <Component {...pageProps} />
                    </main>
                </SessionProvider>
                {showPanel && <ThemePanel />}
            </Theme>
        </ThemeProvider>
    )
}

export default api.withTRPC(MyApp)
