// Componentsj
import AdminLayout from '~/layouts/AdminLayout'
import SearchContainer from '~/components/SearchContainer'
import Loading from '~/components/Loading'
// Utils
import { api } from '~/utils/api'
import { DataType } from '~/types/enums'

export default function AdminArtists() {
    const {
        data: artists,
        isLoading: artistsLoading,
        refetch
    } = api.artist.getAll.useQuery()
    const { data: featuredItem, isLoading: featuredLoading } =
        api.artist.getFeatured.useQuery()

    const isLoading = artistsLoading || featuredLoading

    const onEdit = async () => {
        await refetch()
    }

    return (
        <AdminLayout pageTitle="Jazz In Toronto | Admin - artists">
            <>
                {artists && !isLoading && (
                    <SearchContainer
                        data={{ type: DataType.ARTIST, items: artists }}
                        heading="Find artists"
                        featuredItem={featuredItem}
                        isLoading={isLoading}
                        onEdit={onEdit}
                    />
                )}
                {isLoading && <Loading />}
            </>
        </AdminLayout>
    )
}
