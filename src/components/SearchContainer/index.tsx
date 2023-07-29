// Components
import SearchBar from './components/SearchBar'
import SearchTable from './components/SearchTable'
// Types
import { type Items } from '~/types/data'
// Hooks
import useSearch from './hooks/useSearch'
import { type DataType } from '~/types/enums'

interface Props {
    items: Items
    itemType: DataType
    isLoading: boolean
    searchDate?: Date
    setSearchDate?: (date: Date) => void
}

export default function SearchContainer({
    items,
    itemType,
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
                <SearchTable items={filteredItems} headerType={itemType} />
            ) : (
                <div>Loading...</div>
            )}
        </div>
    )
}
