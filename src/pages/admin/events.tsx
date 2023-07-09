import { useState } from 'react'
import AdminLayout from '~/layouts/AdminLayout'
import SearchContainer from '~/components/SearchContainer'
import { api } from '~/utils/api'

export default function AdminEvents() {
    const [searchDay, setSearchDay] = useState<Date>(new Date())
    const { data: events, isLoading } = api.event.getAllByDay.useQuery({
        date: searchDay
    })
    return (
        <AdminLayout>
            <SearchContainer
                items={events}
                isLoading={isLoading}
                searchDay={searchDay}
                setSearchDay={setSearchDay}
            />
        </AdminLayout>
    )
}
