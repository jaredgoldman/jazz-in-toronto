// Componentsj
import AdminLayout from '~/layouts/AdminLayout'
import SearchContainer from '~/components/SearchContainer'
// Utils
import { api } from '~/utils/api'
import { DataType } from '~/types/enums'

export default function AdminBands() {
    const { data: events, isLoading } = api.band.getAll.useQuery()

    return (
        <AdminLayout>
            <>
                {events && (
                    <SearchContainer
                        items={events}
                        isLoading={isLoading}
                        itemType={DataType.BAND}
                    />
                )}
                {isLoading && <div>Loading...</div>}
            </>
        </AdminLayout>
    )
}
