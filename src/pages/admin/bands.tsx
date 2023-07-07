import AdminLayout from "~/layouts/AdminLayout"
import SearchContainer from "~/components/SearchContainer"
import { api } from "~/utils/api"

export default function AdminBands() {
    const { data: events, isLoading } = api.band.getAll.useQuery()
    return (
        <AdminLayout>
            <SearchContainer items={events} isLoading={isLoading}/>
        </AdminLayout>
    )
}
