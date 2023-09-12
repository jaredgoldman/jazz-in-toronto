// Libraries
import { useState } from 'react'
// Components
import SearchContainer from '../SearchContainer'
import Loading from '../Loading'
/// Types
import { DataType } from '~/types/enums'
// Utils
import { api } from '~/utils/api'

export default function SearchApprovedEvents() {
    const [page, setPage] = useState<number>(1)
    const [rowsPerPage, setRowsPerPage] = useState<number>(10)

    const skip = (page - 1) * rowsPerPage
    const { data, isLoading, refetch } = api.event.getUnapproved.useQuery({
        skip,
        take: rowsPerPage
    })

    const onEdit = async () => {
        await refetch()
    }

    return (
        <>
            {isLoading && <Loading />}
            {data && (
                <SearchContainer
                    data={{
                        type: DataType.EVENT,
                        items: data.paginatedEvents
                    }}
                    heading="Approve Events"
                    onEdit={onEdit}
                    isLoading={isLoading}
                    successAttribute="approved"
                    paginate={true}
                    showDateFilter={false}
                    paginationProps={{
                        itemCount: data.unapprovedCount,
                        page,
                        setPage,
                        rowsPerPage,
                        setRowsPerPage
                    }}
                />
            )}
        </>
    )
}
