// Components
import RootLayout from '~/layouts/RootLayout'
import Featured from '~/components/Featured'

export default function Home() {
    return (
        <RootLayout>
            <main>
                <Featured />
            </main>
        </RootLayout>
    )
}
