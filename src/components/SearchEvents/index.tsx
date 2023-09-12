// Libraries
import { useState } from 'react'
// Components
import SearchContainer from '../SearchContainer'
import Loading from '../Loading'
// Types
import { DataType } from '~/types/enums'
// Utils
import { api } from '~/utils/api'

export default function SearchEvents() {
    const [searchDate, setSearchDate] = useState<Date>(new Date())
    const { data, isLoading, refetch } = api.event.getAllByDay.useQuery({
        date: searchDate
    })

    const onEdit = async () => {
        await refetch()
    }

    return (
        <>
            {isLoading && <Loading />}
            {data && (
                <SearchContainer
                    data={{ type: DataType.EVENT, items: data }}
                    heading="Find Events"
                    onEdit={onEdit}
                    isLoading={isLoading}
                    searchDate={searchDate}
                    setSearchDate={setSearchDate}
                />
            )}
        </>
    )
}
