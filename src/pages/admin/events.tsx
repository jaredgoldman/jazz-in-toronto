import AdminLayout from "~/layouts/AdminLayout"
import SearchContainer from "~/components/SearchContainer"
import { api } from "~/utils/api"

export default function AdminEvents() {
    const { data: events, isLoading } = api.event.getAll.useQuery()
    return (
        <AdminLayout>
            <SearchContainer items={events} isLoading={isLoading}/>
        </AdminLayout>
    )
}
