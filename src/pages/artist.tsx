import ArtistForm from '~/components/Forms/Artist'
import RootLayout from '~/layouts/RootLayout'

export default function Artist() {
    return (
        <RootLayout pageTitle="Jazz In Toronto | Submit your artist">
            <ArtistForm />
        </RootLayout>
    )
}
