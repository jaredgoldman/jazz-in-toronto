// Libraries
import { useEffect, useState } from 'react'
// Types
import { SearchOption } from '../types'
import { type Item, type Items } from '~/types/data'
// Utils
import { deepEqual } from '~/utils/shared'

interface SearchData {
    name: string
    date: Date | null
    website: string
    instagramHandle: string
}

const initialSearchData = {
    name: '',
    date: null,
    website: '',
    instagramHandle: ''
}

export default function useSearch(
    items: Items,
    searchDate?: Date,
    setSearchDate?: (date: Date) => void
) {
    console.log(items)
    const [searchData, setSearchData] = useState<SearchData>({
        name: '',
        date: searchDate || null,
        website: '',
        instagramHandle: ''
    })

    const [filteredItems, setFilteredItems] = useState<Items>(items)

    useEffect(() => {
        // If we havne't searched yet or if we've cleared the search, return all items
        if (deepEqual(searchData, initialSearchData)) {
            return setFilteredItems(items)
        }

        if (items && searchData) {
            const filterItems = () => {
                // XXX: Fix this
                return (items as any).filter((item: Item) => {
                    let nameMatch = false
                    let websiteMatch = false
                    let instagramHandleMatch = false

                    if (
                        !searchData.name ||
                        (searchData.name &&
                            item.name
                                .toLowerCase()
                                .includes(searchData.name.toLowerCase()))
                    ) {
                        nameMatch = true
                    }
                    if (
                        !searchData.website ||
                        (searchData.website &&
                            item.website &&
                            item.website
                                .toLowerCase()
                                .includes(searchData.website.toLowerCase()))
                    ) {
                        websiteMatch = true
                    }
                    if (
                        !searchData.instagramHandle ||
                        (searchData.instagramHandle &&
                            item.instagramHandle &&
                            item.instagramHandle
                                .toLowerCase()
                                .includes(
                                    searchData.instagramHandle.toLowerCase()
                                ))
                    ) {
                        instagramHandleMatch = true
                    }

                    if (nameMatch && websiteMatch && instagramHandleMatch) {
                        return item
                    }
                })
            }
            const filteredItems = filterItems()
            setFilteredItems(filteredItems)
        }
    }, [searchData, items])

    const handleSearch = (
        searchData: string | Date | null,
        searchOption: SearchOption
    ) => {
        switch (searchOption) {
            case SearchOption.Name:
                setSearchData((prevValues) => ({
                    ...prevValues,
                    name: searchData as string
                }))
                break
            case SearchOption.Website:
                setSearchData((prevValues) => ({
                    ...prevValues,
                    website: searchData as string
                }))
                break
            case SearchOption.InstagramHandle:
                setSearchData((prevValues) => ({
                    ...prevValues,
                    instagramHandle: searchData as string
                }))
                break
            case SearchOption.Date:
                // Handle setting page-level searchDate state here
                setSearchDate && setSearchDate(searchData as Date)
                setSearchData((prevValues) => ({
                    ...prevValues,
                    date: searchData as Date
                }))
                break
        }
    }

    return {
        searchData,
        setSearchData,
        handleSearch,
        filteredItems
    }
}
