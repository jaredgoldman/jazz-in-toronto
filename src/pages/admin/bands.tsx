// Componentsj
import AdminLayout from '~/layouts/AdminLayout'
import SearchContainer from '~/components/SearchContainer'
import Loading from '~/components/Loading'
// Utils
import { api } from '~/utils/api'
import { DataType } from '~/types/enums'

export default function AdminBands() {
    const {
        data: bands,
        isLoading: bandsLoading,
        refetch
    } = api.band.getAll.useQuery()
    const { data: featuredItem, isLoading: featuredLoading } =
        api.band.getFeatured.useQuery()

    const isLoading = bandsLoading || featuredLoading

    return (
        <AdminLayout pageTitle="Jazz In Toronto | Admin - Bands">
            <>
                {bands && !isLoading && (
                    <SearchContainer
                        heading="Find Bands"
                        items={bands}
                        featuredItem={featuredItem}
                        isLoading={isLoading}
                        itemType={DataType.BAND}
                        refetch={refetch}
                    />
                )}
                {isLoading && <Loading />}
            </>
        </AdminLayout>
    )
}
