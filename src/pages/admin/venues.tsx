// Components
import AdminLayout from '~/layouts/AdminLayout'
import { Heading } from '@radix-ui/themes'
// Utils
import { VenuesTable } from '~/components/Tables'

export default function AdminVenues() {
//moved data-fetching logic to Table components
    return (
        <AdminLayout pageTitle="Jazz In Toronto | Admin - Venues">
            <>
                <Heading align="center" size="9" mb="9">
                    Venues
                </Heading>
                  <VenuesTable/>
            </>
        </AdminLayout>
    )
}
