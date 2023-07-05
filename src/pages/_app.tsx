import { type Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { type AppType } from "next/app"
import { api } from "~/utils/api"
import useScript from "~/utils/useScript"
import "~/styles/globals.css"

const MyApp: AppType<{ session: Session | null }> = ({
    Component,
    pageProps: { session, ...pageProps },
}) => {
    useScript("https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places&callback=initMap")
    return (
        <SessionProvider session={session}>
            <Component {...pageProps} />
        </SessionProvider>
    )
}

export default api.withTRPC(MyApp)
