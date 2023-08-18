// Componentsj
import AdminLayout from '~/layouts/AdminLayout'
import SearchContainer from '~/components/SearchContainer'
import Loading from '~/components/Loading'
// Utils
import { api } from '~/utils/api'
import { DataType } from '~/types/enums'

export default function Adminartists() {
    const {
        data: artists,
        isLoading: artistsLoading,
        refetch
    } = api.artist.getAll.useQuery()
    const { data: featuredItem, isLoading: featuredLoading } =
        api.artist.getFeatured.useQuery()

    const isLoading = artistsLoading || featuredLoading

    return (
        <AdminLayout pageTitle="Jazz In Toronto | Admin - artists">
            <>
                {artists && !isLoading && (
                    <SearchContainer
                        heading="Find artists"
                        items={artists}
                        featuredItem={featuredItem}
                        isLoading={isLoading}
                        itemType={DataType.ARTIST}
                        refetch={refetch}
                    />
                )}
                {isLoading && <Loading />}
            </>
        </AdminLayout>
    )
}
