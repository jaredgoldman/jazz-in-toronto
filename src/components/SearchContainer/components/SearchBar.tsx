// Libraries
import { useState } from 'react'
// Components
import ReactDatePicker from 'react-datepicker'
// Types
import { SearchOption } from '../types'

interface Props {
    onSearch: (
        searchData: string | Date | null,
        searchOption: SearchOption
    ) => void
    searchDate?: Date
}

export default function SearchBar({ onSearch, searchDate }: Props) {
    const [startDate, setStartDate] = useState<Date | null>(searchDate || null)
    return (
        <div className="m-2 flex flex-col">
            <div className="flex">
                {searchDate && (
                    <div className="m-2 flex flex-col">
                        <label>Date</label>
                        <ReactDatePicker
                            className="border-2 border-black p-1 text-black"
                            onChange={(date) => {
                                onSearch(date, SearchOption.Date)
                                setStartDate(date)
                            }}
                            selected={startDate}
                        />
                    </div>
                )}
                <div className="m-2 flex flex-col">
                    <label>Name</label>
                    <input
                        className="border-2 border-black p-1 text-black"
                        type="text"
                        onChange={(event) =>
                            onSearch(event.target.value, SearchOption.Name)
                        }
                        placeholder="Filter by name"
                    />
                </div>
                <div className="m-2 flex flex-col">
                    <label>Website</label>
                    <input
                        className="border-2 border-black p-1 text-black"
                        type="text"
                        onChange={(event) =>
                            onSearch(event.target.value, SearchOption.Website)
                        }
                        placeholder="Filter by website"
                    />
                </div>
                <div className="m-2 flex flex-col">
                    <label>Instagram Handle</label>
                    <input
                        className="border-2 border-black p-1 text-black"
                        type="text"
                        onChange={(event) =>
                            onSearch(
                                event.target.value,
                                SearchOption.InstagramHandle
                            )
                        }
                        placeholder="Filter by instagram handle"
                    />
                </div>
            </div>
        </div>
    )
}
