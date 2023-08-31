// Components
import SearchBar from './components/SearchBar'
import SearchTable from './components/SearchTable'
import { Container, Heading } from '@radix-ui/themes'
// Types
import type { EventWithArtistVenue, Venue, Artist } from '~/types/data'
import { type TableData } from './types'
// Hooks
import useSearch from './hooks/useSearch'

interface Props {
    data: TableData
    isLoading: boolean
    heading?: string
    featuredItem?: EventWithArtistVenue | Venue | Artist | null
    searchDate?: Date
    onEdit?: () => Promise<void>
    setSearchDate?: (date: Date) => void
}

export default function SearchContainer({
    data,
    isLoading,
    heading,
    featuredItem,
    searchDate,
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
            <Heading mb="3" ml="3">
                {heading}
            </Heading>
            <SearchBar
                onSearch={handleSearch}
                searchDate={searchDate}
                itemType={data.type}
            />
            {filteredItems && (
                <SearchTable
                    data={
                        { type: data.type, items: filteredItems } as TableData
                    }
                    isLoading={isLoading}
                    featuredItem={featuredItem}
                    onEdit={onEdit}
                />
            )}
        </Container>
    )
}
