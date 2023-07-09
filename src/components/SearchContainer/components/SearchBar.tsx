import { SearchOption } from '../types'
import ReactDatePicker from 'react-datepicker'

interface Props {
    onSearch: (
        searchData: string | Date | null,
        searchOption: SearchOption
    ) => void
    searchDate?: Date
}

export default function SearchBar({ onSearch, searchDate }: Props) {
    return (
        <div>
            <h1>Search</h1>
            {searchDate && (
                <>
                    <label>Date</label>
                    <ReactDatePicker
                        onChange={(date) => onSearch(date, SearchOption.Date)}
                        selected={new Date()}
                    />
                </>
            )}
            <label>Name</label>
            <input
                className="border-2 border-black"
                type="text"
                onChange={(event) =>
                    onSearch(event.target.value, SearchOption.Name)
                }
            />
            <label>Website</label>
            <input
                className="border-2 border-black"
                type="text"
                onChange={(event) =>
                    onSearch(event.target.value, SearchOption.Website)
                }
            />
            <label>Instagram Handle</label>
            <input
                className="border-2 border-black"
                type="text"
                onChange={(event) =>
                    onSearch(event.target.value, SearchOption.InstagramHandle)
                }
            />
            )
        </div>
    )
}
