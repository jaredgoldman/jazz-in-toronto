// Componenets
import Loading from '~/components/Loading'
import AdminLayout from '~/layouts/AdminLayout'
import { Heading, Separator } from '@radix-ui/themes'
import AdminStats from '~/components/AdminStats'
import AdminControls from '~/components/AdminControls'
// Utils
import { api } from '~/utils/api'

export default function AdminHome() {
    const { data, isLoading } = api.data.getStats.useQuery()

    return (
        <AdminLayout pageTitle="Jazz In Toronto | Admin - Bands">
            <Heading mt="2" mb="7" align="center">
                Dashboard
            </Heading>
            {isLoading && <Loading />}
            {data && <AdminStats data={data} />}
            <Separator orientation="horizontal" size="4" my="4" />
            <Heading mt="2" mb="7" align="center">
                Controls
            </Heading>
            <AdminControls />
        </AdminLayout>
    )
}
