// Components
import RootLayout from '~/layouts/RootLayout'
import BandForm from '~/components/Forms/Band'

export default function Book(): JSX.Element {
    return (
        <RootLayout>
            <main>
                <BandForm />
            </main>
        </RootLayout>
    )
}
