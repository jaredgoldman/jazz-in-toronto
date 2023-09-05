// Components
import AdminLayout from '~/layouts/AdminLayout'
import SearchContainer from '~/components/SearchContainer'
// Utils
import { api } from '~/utils/api'
import { DataType } from '~/types/enums'
import Loading from '~/components/Loading'

export default function AdminVenues() {
    const { data: events, isLoading, refetch } = api.venue.getAll.useQuery()

    const onEdit = async () => {
        await refetch()
    }

    return (
        <AdminLayout pageTitle="Jazz In Toronto | Admin - Venues">
            <>
                {events && !isLoading && (
                    <SearchContainer
                        data={{ type: DataType.VENUE, items: events }}
                        onEdit={onEdit}
                        heading="Find Venues"
                        isLoading={isLoading}
                    />
                )}
                {isLoading && <Loading />}
            </>
        </AdminLayout>
    )
}
