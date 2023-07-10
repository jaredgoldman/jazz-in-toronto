import { useState } from 'react'
import AdminLayout from '~/layouts/AdminLayout'
import SearchContainer from '~/components/SearchContainer'
import { api } from '~/utils/api'

export default function AdminEvents() {
    const [searchDate, setSearchDate] = useState<Date>(new Date())
    const { data: events, isLoading } = api.event.getAllByDay.useQuery({
        date: searchDate
    })

    return (
        <AdminLayout>
            <SearchContainer
                items={events}
                isLoading={isLoading}
                searchDate={searchDate}
                setSearchDate={setSearchDate}
            />
        </AdminLayout>
    )
}
