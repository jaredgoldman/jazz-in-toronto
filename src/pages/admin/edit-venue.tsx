import VenueForm from '~/components/Forms/Venue'
import RootLayout from '~/layouts/RootLayout'
import { Flex } from '@radix-ui/themes'

export default function EditVenue() {
    return (
        <RootLayout pageTitle="Jazz in Toronto | Edit Venue">
            <Flex justify="center" px={{ initial: '5', xs: '0' }} py="9">
                <VenueForm />
            </Flex>
        </RootLayout>
    )
}
