import ArtistForm from '~/components/Forms/Artist'
import RootLayout from '~/layouts/RootLayout'
import { Flex } from '@radix-ui/themes'

export default function EditArtist() {
    return (
        <RootLayout pageTitle="Jazz in Toronto | Edit Artist">
            <Flex justify="center" px={{ initial: '5', xs: '0' }} py="9">
                <ArtistForm />
            </Flex>
        </RootLayout>
    )
}
