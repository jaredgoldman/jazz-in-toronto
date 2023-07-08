import { SearchOption } from '../hooks/useSearch'

interface Props {
    onSearch: (searchTerm: string) => void
    onSelect: (selectedOption: SearchOption) => void
}

export default function SearchBar({ onSearch, onSelect }: Props) {
    const searchOptionArray = Object.values(SearchOption)

    const readableOptions = {
        [SearchOption.Name]: 'Name',
        [SearchOption.Date]: 'Date',
        [SearchOption.Website]: 'Website',
        [SearchOption.InstagramHandle]: 'Instagram Handle'
    }

    return (
        <div>
            <h1>Search</h1>
            <select
                onChange={(event) =>
                    onSelect(event.target.value as SearchOption)
                }
            >
                {searchOptionArray.map((option: SearchOption) => {
                    return (
                        <option key={option} value={option}>
                            {readableOptions[option]}
                        </option>
                    )
                })}
            </select>
            <input
                className="border-2 border-black"
                type="text"
                onChange={(event) => onSearch(event.target.value)}
            />
        </div>
    )
}
