import VenueForm from '~/components/Forms/Venue'
import AdminLayout from '~/layouts/AdminLayout'
import { Flex } from '@radix-ui/themes'

export default function EditVenue() {
    return (
        <AdminLayout pageTitle="Jazz in Toronto | Edit Venue">
            <Flex justify="center" px={{ initial: '5', xs: '0' }} py="9">
                <VenueForm />
            </Flex>
        </AdminLayout>
    )
}
