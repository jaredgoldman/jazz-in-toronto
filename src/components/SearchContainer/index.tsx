// Components
import SearchBar from './components/SearchBar'
import SearchTable from './components/SearchTable'
// Types
import { type Items } from '~/types/data'
// Hooks
import useSearch from './hooks/useSearch'

interface Props {
    items: Items
    isLoading: boolean
    searchDate?: Date
    setSearchDate?: (date: Date) => void
}

export default function SearchContainer({
    items,
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
