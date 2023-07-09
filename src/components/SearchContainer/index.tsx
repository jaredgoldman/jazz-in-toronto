import { Venue, Band } from '@prisma/client'
import { EventWithBandVenue } from '~/types/data'
import SearchBar from './components/SearchBar'
import useSearch from './hooks/useSearch'

interface Props {
    items: Venue[] | Band[] | EventWithBandVenue[] | undefined
    isLoading: boolean
}

export default function SearchContainer({
    items,
    isLoading
}: Props): JSX.Element {
    const { filteredItems, handleSearch } = useSearch(items)

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
            <SearchBar onSearch={handleSearch} />
            <div>{searchedItems}</div>
        </div>
    )
}
