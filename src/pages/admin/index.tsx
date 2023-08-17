// Componenets
import Loading from '~/components/Loading'
import AdminLayout from '~/layouts/AdminLayout'
import { Heading } from '@radix-ui/themes'
import AdminDashboard from '~/components/AdminDashboard'
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
            {data && <AdminDashboard data={data} />}
        </AdminLayout>
    )
}
