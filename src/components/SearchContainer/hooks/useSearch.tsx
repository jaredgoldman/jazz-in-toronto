// Libraries
import { useEffect, useState } from 'react'
import { useEvent } from '~/hooks/useEvent'
// Types
import { SearchOption, type TableData } from '../types'
import type { EventWithArtistVenue, Artist, Venue } from '~/types/data'
import { DataType } from '~/types/enums'
// Utils
import { deepEqual } from '~/utils/shared'

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
    data: TableData,
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

    const [filteredItems, setFilteredItems] = useState<TableData['items']>(
        data.items || []
    )

    // Filter functions
    const filterName = useEvent(
        (item: Artist | Venue | EventWithArtistVenue) => {
            return (
                !searchData.name ||
                (searchData.name &&
                    item.name
                        .toLowerCase()
                        .includes(searchData.name.toLowerCase()))
            )
        }
    )

    const filterWebsite = useEvent(
        (item: Artist | Venue | EventWithArtistVenue) => {
            return (
                !searchData.website ||
                (searchData.website &&
                    item.website &&
                    item.website
                        .toLowerCase()
                        .includes(searchData.website.toLowerCase()))
            )
        }
    )

    const filterInstagramHandle = useEvent(
        (item: Artist | Venue | EventWithArtistVenue) => {
            return (
                !searchData.instagramHandle ||
                (searchData.instagramHandle &&
                    item.instagramHandle &&
                    item.instagramHandle
                        .toLowerCase()
                        .includes(searchData.instagramHandle.toLowerCase()))
            )
        }
    )

    const filterVenue = useEvent((event: EventWithArtistVenue) => {
        return (
            !searchData.venue ||
            (searchData.venue &&
                event.venue.name &&
                event.venue.name
                    .toLowerCase()
                    .includes(searchData.venue.toLowerCase()))
        )
    })

    useEffect(() => {
        // If we havne't searched yet or if we've cleared the search, return all items
        if (deepEqual(searchData, initialSearchData) && data.items?.length) {
            return setFilteredItems(data.items)
        }

        if (data.items && searchData) {
            // TODO: Dry this up
            const filterItems = () => {
                if (data.type === DataType.EVENT) {
                    let nameMatch = false
                    let websiteMatch = false
                    let instagramHandleMatch = false
                    let venueMatch = false

                    return data.items.filter((item: EventWithArtistVenue) => {
                        if (filterName(item)) {
                            nameMatch = true
                        }
                        if (filterWebsite(item)) {
                            websiteMatch = true
                        }
                        if (filterInstagramHandle(item)) {
                            instagramHandleMatch = true
                        }
                        if (filterVenue(item)) {
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
                } else if (data.type === DataType.ARTIST) {
                    let nameMatch = false
                    let websiteMatch = false
                    let instagramHandleMatch = false

                    return data.items.filter((item: Artist) => {
                        if (filterName(item)) {
                            nameMatch = true
                        }
                        if (filterWebsite(item)) {
                            websiteMatch = true
                        }
                        if (filterInstagramHandle(item)) {
                            instagramHandleMatch = true
                        }
                        if (nameMatch && websiteMatch && instagramHandleMatch) {
                            return item
                        }
                    })
                } else if (data.type === DataType.VENUE) {
                    let nameMatch = false
                    let websiteMatch = false
                    let instagramHandleMatch = false

                    return data.items.filter((item: Venue) => {
                        if (filterName(item)) {
                            nameMatch = true
                        }
                        if (filterWebsite(item)) {
                            websiteMatch = true
                        }
                        if (filterInstagramHandle(item)) {
                            instagramHandleMatch = true
                        }
                        if (nameMatch && websiteMatch && instagramHandleMatch) {
                            return item
                        }
                    })
                } else {
                    return []
                }
            }
            const filteredItems = filterItems()
            setFilteredItems(filteredItems.sort())
        }
    }, [
        searchData,
        data.items,
        filterInstagramHandle,
        filterName,
        filterVenue,
        filterWebsite,
        data.type
    ])

    // const sortItems = (items: Array<Item>) => {}

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
