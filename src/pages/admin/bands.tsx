// Componentsj
import AdminLayout from '~/layouts/AdminLayout'
import SearchContainer from '~/components/SearchContainer'
// Utils
import { api } from '~/utils/api'
import { DataType } from '~/types/enums'

export default function AdminBands() {
    const { data: bands, isLoading: bandsLoading } = api.band.getAll.useQuery()
    const { data: featuredItem, isLoading: featuredLoading } =
        api.band.getFeatured.useQuery()

    const isLoading = bandsLoading || featuredLoading

    return (
        <AdminLayout>
            <>
                {bands && !isLoading && (
                    <SearchContainer
                        items={bands}
                        featuredItem={featuredItem}
                        isLoading={isLoading}
                        itemType={DataType.BAND}
                    />
                )}
                {isLoading && <div>Loading...</div>}
            </>
        </AdminLayout>
    )
}
