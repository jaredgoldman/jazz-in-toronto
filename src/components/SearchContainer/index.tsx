// Components
import SearchBar from './components/SearchBar'
import SearchTable from './components/SearchTable'
import { Container, Heading } from '@radix-ui/themes'
// Types
import { type Items, type Item } from '~/types/data'
import { type QueryObserverResult } from '@tanstack/react-query'
// Hooks
import useSearch from './hooks/useSearch'
import { type DataType } from '~/types/enums'

interface Props<T> {
    heading?: string
    items?: Items
    itemType: DataType
    isLoading: boolean
    featuredItem?: Item | null
    searchDate?: Date
    setSearchDate?: (date: Date) => void
    refetch?: () => Promise<QueryObserverResult<T>>
}

export default function SearchContainer<T>({
    heading,
    items,
    featuredItem,
    itemType,
    searchDate,
    setSearchDate,
    refetch
}: Props<T>): JSX.Element {
    const { filteredItems, handleSearch } = useSearch(
        itemType,
        items,
        searchDate,
        setSearchDate
    )

    return (
        <Container size="4">
            <Heading mb="3" ml="3">
                {heading}
            </Heading>
            <SearchBar
                onSearch={handleSearch}
                searchDate={searchDate}
                itemType={itemType}
            />
            {filteredItems && (
                <SearchTable
                    items={filteredItems}
                    dataType={itemType}
                    featuredItem={featuredItem}
                    refetch={refetch}
                />
            )}
        </Container>
    )
}
