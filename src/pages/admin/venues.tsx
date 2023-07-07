import AdminLayout from "~/layouts/AdminLayout"
import SearchContainer from "~/components/SearchContainer"
import { api } from "~/utils/api"

export default function AdminVenues() {
    const { data: events, isLoading } = api.venue.getAll.useQuery()
    return (
        <AdminLayout>
            <SearchContainer items={events} isLoading={isLoading}/>
        </AdminLayout>
    )
}
