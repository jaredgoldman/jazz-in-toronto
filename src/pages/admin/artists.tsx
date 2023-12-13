// Componentsj
import { Heading } from '@radix-ui/themes'
import AdminLayout from '~/layouts/AdminLayout'
import SearchContainer from '~/components/SearchContainer'
import Loading from '~/components/Loading'
// Utils
import { api } from '~/utils/api'
import { DataType } from '~/types/enums'
import { ArtistsTable } from '~/components/Tables'

export default function AdminArtists() {
    const {
        data: artists,
        isLoading: artistsLoading,
        refetch
    } = api.artist.getAll.useQuery()

    const onEdit = async () => {
        await refetch()
    }

    return (
        <AdminLayout pageTitle="Jazz In Toronto | Admin - artists">
            <>
                <Heading align="center" size="9" mb="9">
                    Artists
                </Heading>
                {artists && !artistsLoading && (
                <ArtistsTable/>
                )}
                {artistsLoading && <Loading />}
            </>
        </AdminLayout>
    )
}
