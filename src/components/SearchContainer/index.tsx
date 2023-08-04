// Components
import SearchBar from './components/SearchBar'
import SearchTable from './components/SearchTable'
// Types
import { type Items, type Item } from '~/types/data'
// Hooks
import useSearch from './hooks/useSearch'
import { type DataType } from '~/types/enums'

interface Props {
    items: Items
    itemType: DataType
    isLoading: boolean
    featuredItem?: Item | null
    searchDate?: Date
    setSearchDate?: (date: Date) => void
}

export default function SearchContainer({
    items,
    featuredItem,
    itemType,
    searchDate,
    setSearchDate
}: Props): JSX.Element {
    const { filteredItems, handleSearch } = useSearch(
        items,
        itemType,
        searchDate,
        setSearchDate
    )

    return (
        <div>
            <SearchBar
                onSearch={handleSearch}
                searchDate={searchDate}
                itemType={itemType}
            />
            {filteredItems ? (
                <SearchTable
                    items={filteredItems}
                    headerType={itemType}
                    featuredItem={featuredItem}
                />
            ) : (
                <div>Loading...</div>
            )}
        </div>
    )
}
