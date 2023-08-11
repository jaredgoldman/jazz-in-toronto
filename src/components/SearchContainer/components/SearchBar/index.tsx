// Libraries
import { useState } from 'react'
// Components
// Types
import { SearchOption } from '../../types'
import { DataType } from '~/types/enums'
import Container from '~/components/Container'
import SearchFilter from './SearchFilter'

interface Props {
    onSearch: (
        searchData: string | Date | null,
        searchOption: SearchOption
    ) => void
    searchDate?: Date
    itemType: DataType
}
// TODO: recator so search fields take up entire width of viewport
export default function SearchBar({ onSearch, searchDate, itemType }: Props) {
    const [startDate, setStartDate] = useState<Date | null>(searchDate || null)

    const onSearchDate = (
        searchData: string | Date | null,
        searchOption: SearchOption
    ) => {
        setStartDate(searchData as Date)
        onSearch(searchData, searchOption)
    }

    return (
        <Container width="lg" justify="left">
            <div className="flex flex-col md:flex-row">
                {itemType === DataType.EVENT && (
                    <>
                        <SearchFilter
                            onSearch={onSearchDate}
                            type={SearchOption.Date}
                            label="Date"
                            setStartDate={setStartDate}
                            startDate={startDate}
                        />
                        <SearchFilter
                            onSearch={onSearch}
                            type={SearchOption.Venue}
                            label="Venue"
                        />
                    </>
                )}
                <SearchFilter
                    onSearch={onSearch}
                    type={SearchOption.Name}
                    label="Name"
                />
                <SearchFilter
                    onSearch={onSearch}
                    type={SearchOption.Website}
                    label="Website"
                />
                <SearchFilter
                    onSearch={onSearch}
                    type={SearchOption.InstagramHandle}
                    label="Instagram"
                />
            </div>
        </Container>
    )
}
