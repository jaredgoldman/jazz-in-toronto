interface Props {
    onSearch: (searchTerm: string) => void
    selectOptions: string[]
    onSelect: (selectedOption: string) => void
}
export default function SearchBar({ onSearch, selectOptions, onSelect }: Props}) {
    return (
        <div>
            <select onSelect={onSelect}>
                {selectOptions.map((option) => {
                    return <option>{option}</option>
                })}
            </select>
            <input type="text" onChange={onSearch}/>
        </div>
    )
}
