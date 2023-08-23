// Components
import SearchBar from './components/SearchBar'
import SearchTable from './components/SearchTable'
import { Container, Heading } from '@radix-ui/themes'
// Types
import type { EventWithArtistVenue, Venue, Artist } from '~/types/data'
import { type QueryObserverResult } from '@tanstack/react-query'
import { type DataType } from '~/types/enums'
// Hooks
import useSearch from './hooks/useSearch'

interface Props<T> {
    heading?: string
    items?: Array<EventWithArtistVenue | Venue | Artist>
    itemType: DataType
    isLoading: boolean
    featuredItem?: EventWithArtistVenue | Venue | Artist | null
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
                    itemsData={filteredItems}
                    dataType={itemType}
                    featuredItem={featuredItem}
                    refetch={refetch}
                />
            )}
        </Container>
    )
}
