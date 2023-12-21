import ArtistForm from '~/components/Forms/Artist'
import RootLayout from '~/layouts/RootLayout'
import { Flex } from '@radix-ui/themes'

export default function Artist() {
    return (
        <RootLayout pageTitle="Jazz In Toronto | Submit your artist">
            <Flex justify="center" px={{ initial: '5', xs: '0' }} py="9">
                <ArtistForm />
            </Flex>
        </RootLayout>
    )
}
