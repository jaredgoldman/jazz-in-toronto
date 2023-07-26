// Components
import AdminLayout from '~/layouts/AdminLayout'
import SearchContainer from '~/components/SearchContainer'
// Utils
import { api } from '~/utils/api'
import { DataType } from '~/types/enums'

export default function AdminVenues() {
    const { data: events, isLoading } = api.venue.getAll.useQuery()
    return (
        <AdminLayout>
            <>
                {events && (
                    <SearchContainer
                        items={events}
                        isLoading={isLoading}
                        itemType={DataType.VENUE}
                    />
                )}
                {isLoading && <div>Loading...</div>}
            </>
        </AdminLayout>
    )
}
