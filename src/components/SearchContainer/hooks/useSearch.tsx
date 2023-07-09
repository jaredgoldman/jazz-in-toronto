import { useEffect, useState } from 'react'
import { Venue, Band } from '@prisma/client'
import { EventWithBandVenue } from '~/types/data'
import { isSameDay } from 'date-fns'
import { deepEqual } from '~/utils/shared'
type Item = Venue | Band | EventWithBandVenue

export enum SearchTermType {
    String = 'String',
    Date = 'Date'
}

export enum SearchOption {
    Name = 'Name',
    Date = 'Date',
    Website = 'Website',
    InstagramHandle = 'InstagramHandle'
}

const initialSearchData = {
    name: '',
    date: null,
    website: '',
    instagramHandle: ''
}

interface SearchData {
    name: string
    date: Date | null
    website: string
    instagramHandle: string
}

export default function useSearch(items: Item[] | undefined) {
    const [searchData, setSearchData] = useState<SearchData>(initialSearchData)

    const [filteredItems, setFilteredItems] = useState<Item[] | undefined>(
        items
    )

    useEffect(() => {
        console.log(searchData)
        // If we havne't searched yet or if we've cleared the search, return all items
        if (deepEqual(searchData, initialSearchData)) {
            console.log('NO SEARCH')
            return setFilteredItems(items)
        }
        if (items && searchData) {
            const filterItems = () => {
                return items.filter((item: Item) => {
                    let nameMatch = false
                    let dateMatch = false
                    let websiteMatch = false
                    let instagramHandleMatch = false

                    if (
                        !searchData.name ||
                        (searchData.name &&
                            item.name
                                .toLowerCase()
                                .includes(searchData.name.toLowerCase()))
                    ) {
                        console.log('NAME')
                        nameMatch = true
                    }
                    if (
                        !searchData.date ||
                        (isEvent(item) &&
                            searchData.date &&
                            !isSameDay(item.startDate, searchData.date))
                    ) {
                        console.log('DATE')
                        dateMatch = true
                    }
                    if (
                        !searchData.website ||
                        (searchData.website &&
                            item.website &&
                            item.website
                                .toLowerCase()
                                .includes(searchData.website.toLowerCase()))
                    ) {
                        console.log('SITE')
                        websiteMatch = true
                    }
                    if (
                        !searchData.instagramHandle ||
                        (searchData.instagramHandle &&
                            item.instagramHandle &&
                            !item.instagramHandle
                                .toLowerCase()
                                .includes(
                                    searchData.instagramHandle.toLowerCase()
                                ))
                    ) {
                        console.log('INSTA')
                        instagramHandleMatch = true
                    }
                    console.log({
                        nameMatch,
                        dateMatch,
                        websiteMatch,
                        instagramHandleMatch
                    })
                    if (
                        nameMatch &&
                        dateMatch &&
                        websiteMatch &&
                        instagramHandleMatch
                    ) {
                        return item
                    }
                })
            }
            const filteredItems = filterItems()
            setFilteredItems(filteredItems)
        }
    }, [searchData, items])

    const isEvent = (item: Item): item is EventWithBandVenue => {
        return (item as EventWithBandVenue).startDate !== undefined
    }

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
