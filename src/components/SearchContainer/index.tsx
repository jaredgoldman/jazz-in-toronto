import { Venue, Band } from '@prisma/client'
import { EventWithBandVenue } from '~/types/data'
import SearchBar from './components/SearchBar'
import useSearch from './hooks/useSearch'
import { w } from 'vitest/dist/types-2b1c412e'
interface Props {
    items: Venue[] | Band[] | EventWithBandVenue[] | undefined
    isLoading: boolean
}

export default function SearchContainer({
    items,
    isLoading
}: Props): JSX.Element {
    const { handleSearch, handleSelect, filteredItems } = useSearch(items)

    const searchedItems =
        isLoading || !filteredItems ? (
            <div>Loading...</div>
        ) : (
            filteredItems.map((item) => {
                return <div>{item.name}</div>
            })
        )

    return (
        <div>
            <SearchBar onSearch={handleSearch} onSelect={handleSelect} />
            <div>{searchedItems}</div>
        </div>
    )
}
