// Libraries
import { useEffect, useState } from 'react'
import { useEvent } from '~/hooks/useEvent'
// Types
import { SearchOption, type TableData } from '../types'
import type { Artist, EventWithArtistVenue, Venue } from '~/types/data'
import { DataType } from '~/types/enums'
// Utils
import { deepEqual } from '~/utils/shared'
import accept from 'attr-accept'

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
    instagramHandle: '',
    venue: ''
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

    const [sorting, setSorting] = useState({ key: '', ascending: true })

    const clearSearchData = () => {
        setSearchData(initialSearchData)
    }

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

    //sort functions
    const sortName = useEvent(
        (items: Artist[] | Venue[] | EventWithArtistVenue[]) => {
            return items.sort()
        }
    )

    useEffect(() => {
        // If we havne't searched yet or if we've cleared the search, return all items
        if (deepEqual(searchData, initialSearchData) && data.items?.length) {
            return setFilteredItems(data.items)
        }

        if (data.items) {
            // TODO: Dry this up
            const filterItems = () => {
                if (data.type === DataType.EVENT) {
                    return data.items.filter(
                        (item: EventWithArtistVenue) =>
                            filterName(item) &&
                            filterVenue(item) &&
                            filterWebsite(item) &&
                            filterInstagramHandle(item)
                    )
                } else if (data.type === DataType.ARTIST) {
                    return data.items.filter(
                        (item: Artist) =>
                            filterName(item) &&
                            filterInstagramHandle(item) &&
                            filterWebsite(item)
                    )
                } else if (data.type === DataType.VENUE) {
                    return data.items.filter(
                        (item: Venue) =>
                            filterName(item) &&
                            filterInstagramHandle(item) &&
                            filterWebsite(item)
                    )
                } else {
                    return []
                }
            }
            setFilteredItems(filterItems())
        }
    }, [
        searchData,
        data.items,
        filterInstagramHandle,
        filterName,
        filterVenue,
        filterWebsite,
        data.type,
        filteredItems,
        sorting.ascending,
        sorting.key
    ])

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

    const handleSort = (k: string) => {
        const a = !sorting.ascending
        setSorting({
            ascending: a,
            key: k
        })
        console.log('button clicked ', sorting.key, sorting.ascending)
    }

    return {
        searchData,
        setSearchData,
        handleSearch,
        filteredItems,
        clearSearchData,
        handleSort
    }
}
