import { Venue, Band } from '@prisma/client'
import { EventWithBandVenue } from '~/types/data'
import SearchBar from './components/SearchBar'
import useSearch from './hooks/useSearch'
import SearchTable from './components/SearchTable'

interface Props {
    items: Venue[] | Band[] | EventWithBandVenue[] | undefined
    isLoading: boolean
    searchDate?: Date
    setSearchDate?: (date: Date) => void
}

export default function SearchContainer({
    items,
    isLoading,
    searchDate,
    setSearchDate
}: Props): JSX.Element {
    const { filteredItems, handleSearch } = useSearch(
        items,
        searchDate,
        setSearchDate
    )
    return (
        <div>
            <SearchBar onSearch={handleSearch} searchDate={searchDate} />
            {filteredItems ? (
                <SearchTable items={filteredItems} />
            ) : (
                <div>Loading...</div>
            )}
        </div>
    )
}
