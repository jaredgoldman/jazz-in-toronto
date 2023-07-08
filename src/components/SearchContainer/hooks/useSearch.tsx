import { useEffect, useState } from 'react'
import { Venue, Band } from '@prisma/client'
import { EventWithBandVenue } from '~/types/data'

type Item = Venue | Band | EventWithBandVenue

export enum SearchOption {
    Name = 'Name',
    Date = 'Date',
    Website = 'Website',
    InstagramHandle = 'InstagramHandle'
}

export enum SearchTermType {
    String = 'String',
    Date = 'Date'
}

export default function useSearch(items: Item[] | undefined) {
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [selectedOption, setSelectedOption] = useState<SearchOption>(
        SearchOption.Name
    )
    const [filteredItems, setFilteredItems] = useState<Item[] | undefined>(
        items
    )

    useEffect(() => {
        if (!searchTerm) {
            return setFilteredItems(items)
        }
        if (items && searchTerm) {
            const filterItems = () => {
                switch (selectedOption) {
                    case SearchOption.Name:
                        return filterByName(items)
                    case SearchOption.Date:
                        return filterByDate(items)
                    case SearchOption.Website:
                        return filterByWebsite(items)
                    case SearchOption.InstagramHandle:
                        return filterByInstagramHandle(items)
                    default:
                        return items
                }
            }

            const filteredItems = filterItems()
            setFilteredItems(filteredItems)
        }
    }, [searchTerm, selectedOption, items])

    const filterByName = (items: Item[]): Item[] => {
        return items.filter((item) => {
            if ('name' in item) {
                return item.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
            }
            return false
        })
    }

    const filterByDate = (items: Item[]): Item[] => {
        return items.filter((item) => {
            if ('startDate' in item && item.startDate instanceof Date) {
                // Perform date-specific filtering logic here
            }
            return false
        })
    }

    const filterByWebsite = (items: Item[]): Item[] => {
        return items.filter((item) => {
            if ('website' in item) {
                return item.website
                    ?.toLowerCase()
                    .includes(searchTerm.toLowerCase())
            }
            return false
        })
    }

    const filterByInstagramHandle = (items: Item[]): Item[] => {
        return items.filter((item) => {
            if ('instagramHandle' in item) {
                return item.instagramHandle
                    ?.toLowerCase()
                    .includes(searchTerm.toLowerCase())
            }
            return false
        })
    }

    const handleSearch = (searchTerm: string) => {
        setSearchTerm(searchTerm)
    }

    const handleSelect = (selectedOption: SearchOption) => {
        setSelectedOption(selectedOption)
    }

    return {
        searchTerm,
        handleSearch,
        handleSelect,
        SearchOption,
        filteredItems
    }
}
