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

    const isLoading = venuesLoading || featuredLoading
    return (
        <AdminLayout>
            <>
                {events && !isLoading && (
                    <SearchContainer
                        heading="Find Venues"
                        refetch={refetch}
                        items={events}
                        featuredItem={featuredItem}
                        isLoading={isLoading}
                        itemType={DataType.VENUE}
                    />
                )}
                {isLoading && <Loading />}
            </>
        </AdminLayout>
    )
}
