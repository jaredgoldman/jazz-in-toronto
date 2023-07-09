import { Venue, Band } from '@prisma/client'
import { EventWithBandVenue } from '~/types/data'
import SearchBar from './components/SearchBar'
import useSearch from './hooks/useSearch'

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

    const searchedItems =
        isLoading || !filteredItems ? (
            <div>Loading...</div>
        ) : (
            filteredItems.map((item) => {
                return (
                    <div>
                        <div>{item.name}</div>
                    </div>
                )
            })
        )

    return (
        <div>
            <SearchBar onSearch={handleSearch} searchDate={searchDate} />
            <div>{searchedItems}</div>
        </div>
    )
}
