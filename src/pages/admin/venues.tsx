// Components
import AdminLayout from '~/layouts/AdminLayout'
import SearchContainer from '~/components/SearchContainer'
// Utils
import { api } from '~/utils/api'
import { DataType } from '~/types/enums'
import Loading from '~/components/Loading'

export default function AdminVenues() {
    const {
        data: events,
        isLoading: venuesLoading,
        refetch
    } = api.venue.getAll.useQuery()
    const { data: featuredItem, isLoading: featuredLoading } =
        api.venue.getFeatured.useQuery()

    const onEdit = async () => {
        await refetch()
    }

    const isLoading = venuesLoading || featuredLoading

    return (
        <AdminLayout pageTitle="Jazz In Toronto | Admin - Venues">
            <>
                {events && !isLoading && (
                    <SearchContainer
                        data={{ type: DataType.VENUE, items: events }}
                        onEdit={onEdit}
                        heading="Find Venues"
                        featuredItem={featuredItem}
                        isLoading={isLoading}
                    />
                )}
                {isLoading && <Loading />}
            </>
        </AdminLayout>
    )
}
