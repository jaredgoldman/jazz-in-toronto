// Components
import SearchBar from './components/SearchBar'
import SearchTable from './components/SearchTable'
import { Heading, Card, Box } from '@radix-ui/themes'
// Types
import { TableData } from './types'
// Hooks
import useSearch from './hooks/useSearch'

interface Props {
    data: TableData
    isLoading: boolean
    paginate?: boolean
    heading?: string
    searchDate?: Date
    canEditFormState?: boolean
    successAttribute?: 'artistId' | 'approved'
    showDateFilter?: boolean
    page?: number
    rowsPerPage?: number
    itemCount?: number
    onEdit?: () => Promise<void>
    setSearchDate?: (date: Date) => void
    setPage?: (page: number) => void
    setRowsPerPage?: (rowsPerPage: number) => void
    paginationProps?: PaginationProps
}

export interface PaginationProps {
    itemCount: number
    page: number
    setPage: (page: number) => void
    rowsPerPage: number
    setRowsPerPage: (rowsPerPage: number) => void
    rowsPerPageOptions: number[]
}

export default function SearchContainer({
    data,
    isLoading,
    heading,
    searchDate,
    canEditFormState,
    successAttribute,
    showDateFilter = true,
    onEdit,
    setSearchDate,
    paginationProps
}: Props): JSX.Element {
    const { filteredItems, handleSearch } = useSearch(
        data,
        searchDate,
        setSearchDate
    )

    return (
        <Card>
            <Box p="3">
                <Heading mb="3" ml="3">
                    {heading}
                </Heading>
                <SearchBar
                    onSearch={handleSearch}
                    searchDate={searchDate}
                    itemType={data.type}
                    showDateFilter={showDateFilter}
                />
                {filteredItems && (
                    <Box mt="3">
                        <SearchTable
                            data={
                                {
                                    type: data.type,
                                    items: filteredItems
                                } as TableData
                            }
                            isLoading={isLoading}
                            onEdit={onEdit}
                            canEditFormState={canEditFormState}
                            successAttribute={successAttribute}
                            paginationProps={paginationProps}
                        />
                    </Box>
                )}
            </Box>
        </Card>
    )
}
