// Libraries
import { useState } from 'react'
// Components
import { Container, Flex } from '@radix-ui/themes'
// Types
import { SearchOption } from '../../types'
import { DataType } from '~/types/enums'
import SearchFilter from './SearchFilter'

interface Props {
    onSearch: (
        searchData: string | Date | null,
        searchOption: SearchOption
    ) => void
    showDateFilter?: boolean
    clearSearchData?: () => void
    searchDate?: Date
    itemType: DataType
    refetch?: () => Promise<void>
}
// TODO: recator so search fields take up entire width of viewport
export default function SearchBar({
    onSearch,
    searchDate,
    itemType,
    showDateFilter = true
}: // clearSearchData
Props) {
    const [startDate, setStartDate] = useState<Date | null>(searchDate || null)

    const onSearchDate = (
        searchData: string | Date | null,
        searchOption: SearchOption
    ) => {
        setStartDate(searchData as Date)
        onSearch(searchData, searchOption)
    }

    return (
        <Container width="100%">
            <Flex ml="3">
                {itemType === DataType.EVENT && (
                    <>
                        {showDateFilter && (
                            <SearchFilter
                                onSearch={onSearchDate}
                                type={SearchOption.Date}
                                label="Date"
                                setStartDate={setStartDate}
                                startDate={startDate}
                            />
                        )}
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
            </Flex>
        </Container>
    )
}
