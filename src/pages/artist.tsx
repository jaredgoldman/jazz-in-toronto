import ArtistForm from '~/components/Forms/Artist'
import RootLayout from '~/layouts/RootLayout'
import { Flex } from '@radix-ui/themes'

export default function Artist() {
    return (
        <RootLayout
            pageTitle="Jazz In Toronto | Submit your artist"
            breadcrumbs={{
                href: '/event',
                title: 'booking',
                currentPageTitle: 'submit artist'
            }}
        >
            <Flex justify="center" px={{ initial: '5', xs: '0' }} py="6" mb="6">
                <ArtistForm />
            </Flex>
        </RootLayout>
    )
}
