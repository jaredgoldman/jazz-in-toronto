import { ThemeProvider } from 'next-themes'
import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth'
import { AppType } from 'next/app'
import { api } from '~/utils/api'
import { Poppins } from 'next/font/google'
import { Theme } from '@radix-ui/themes'
import '~/styles/globals.css'
import '@radix-ui/themes/styles.css'
import '../styles/theme-config.css'

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
            </Theme>
        </ThemeProvider>
    )
}

export default api.withTRPC(MyApp)
