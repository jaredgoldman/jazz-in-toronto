// Libraries
import { useEffect, useState } from 'react'
// Types
import { SearchOption } from '../types'
import { EventWithBandVenue, type Item } from '~/types/data'
import { DataType } from '~/types/enums'
// Utils
import { deepEqual } from '~/utils/shared'
import { isEvent } from '~/utils/typeguards'

interface SearchData {
    name: string
    date: Date | null
    website: string
    instagramHandle: string
    venue: string
}

const initialSearchData = {
    name: '',
    date: null,
    website: '',
    instagramHandle: ''
}

export default function useSearch(
    items: Array<Item>,
    searchDate?: Date,
    setSearchDate?: (date: Date) => void
) {
    const [searchData, setSearchData] = useState<SearchData>({
        name: '',
        date: searchDate || null,
        website: '',
        instagramHandle: '',
        venue: ''
    })

    const [filteredItems, setFilteredItems] = useState<Array<Item>>(items)

    useEffect(() => {
        // If we havne't searched yet or if we've cleared the search, return all items
        if (deepEqual(searchData, initialSearchData)) {
            return setFilteredItems(items)
        }

        if (items && searchData) {
            const filterItems = () => {
                // XXX: Fix this
                return items.filter((item: Item) => {
                    const itemIsEvent = isEvent(item)
                    let nameMatch = false
                    let websiteMatch = false
                    let instagramHandleMatch = false
                    let venueMatch = itemIsEvent ? false : true

                    if (filterName(item)) {
                        nameMatch = true
                    }
                    if (filterWebsite(item)) {
                        websiteMatch = true
                    }
                    if (filterInstagramHandle(item)) {
                        instagramHandleMatch = true
                    }
                    if (itemIsEvent && filterVenue(item)) {
                        venueMatch = true
                    }
                    if (
                        nameMatch &&
                        websiteMatch &&
                        instagramHandleMatch &&
                        venueMatch
                    ) {
                        return item
                    }
                })
            }
            const filteredItems = filterItems()
            setFilteredItems(filteredItems)
        }
    }, [searchData, items])

    const filterName = (item: Item) => {
        return (
            !searchData.name ||
            (searchData.name &&
                item.name.toLowerCase().includes(searchData.name.toLowerCase()))
        )
    }
    const filterWebsite = (item: Item) => {
        return (
            !searchData.website ||
            (searchData.website &&
                item.website &&
                item.website
                    .toLowerCase()
                    .includes(searchData.website.toLowerCase()))
        )
    }

    const filterInstagramHandle = (item: Item) => {
        return (
            !searchData.instagramHandle ||
            (searchData.instagramHandle &&
                item.instagramHandle &&
                item.instagramHandle
                    .toLowerCase()
                    .includes(searchData.instagramHandle.toLowerCase()))
        )
    }

    const filterVenue = (event: EventWithBandVenue) => {
        return (
            !searchData.venue ||
            (searchData.venue &&
                event.venue.name &&
                event.venue.name
                    .toLowerCase()
                    .includes(searchData.venue.toLowerCase()))
        )
    }

    // TODO: replace with reducer
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
            case SearchOption.Venue:
                setSearchData((prevValues) => ({
                    ...prevValues,
                    venue: searchData as string
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
