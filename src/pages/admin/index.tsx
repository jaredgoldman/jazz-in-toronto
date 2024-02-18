import Loading from '~/components/Loading'
import AdminLayout from '~/layouts/AdminLayout'
import { Heading, Separator } from '@radix-ui/themes'
import AdminStats from '~/components/AdminStats'
import AdminControls from '~/components/AdminControls'
import { api } from '~/utils/api'

export default function AdminHome() {
    const { data, isLoading } = api.data.getStats.useQuery()

    return (
        <AdminLayout pageTitle="Jazz In Toronto | Admin - Bands">
            <Heading mt="2" mb="9" align="center" size="9">
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
