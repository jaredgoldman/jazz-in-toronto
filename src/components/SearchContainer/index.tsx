// Components
import SearchBar from './components/SearchBar'
import SearchTable from './components/SearchTable'
import { Container, Heading, Card, Box } from '@radix-ui/themes'
// Types
import { type TableData } from './types'
// Hooks
import useSearch from './hooks/useSearch'

interface Props {
    data: TableData
    isLoading: boolean
    heading?: string
    searchDate?: Date
    canEditFormState?: boolean
    successAttribute?: 'artistId' | 'approved'
    onEdit?: () => Promise<void>
    setSearchDate?: (date: Date) => void
}

export default function SearchContainer({
    data,
    isLoading,
    heading,
    searchDate,
    canEditFormState,
    successAttribute,
    setSearchDate,
    onEdit
}: Props): JSX.Element {
    const { filteredItems, handleSearch } = useSearch(
        data,
        searchDate,
        setSearchDate
    )

    return (
        <Container size="4">
            <Card>
                <Heading mb="3" ml="3">
                    {heading}
                </Heading>
                <SearchBar
                    onSearch={handleSearch}
                    searchDate={searchDate}
                    itemType={data.type}
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
                        />
                    </Box>
                )}
            </Card>
        </Container>
    )
}
