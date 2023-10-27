// Libraries
import { useEffect, useState } from 'react'
import { useEvent } from '~/hooks/useEvent'
// Types
import { SearchOption, type TableData } from '../types'
import type { Artist, EventWithArtistVenue, Venue } from '~/types/data'
import { DataType } from '~/types/enums'
// Utils
import { deepEqual } from '~/utils/shared'
// import accept from 'attr-accept'

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


  //compare functions
  function compareBool(ascending: boolean, a: boolean, b: boolean) {
    if (ascending) {
      return (a === b) ? 0 : a ? -1 : 1;
    } else {
      return (a === b) ? 0 : a ? 1 : -1;
    }
  }

  function compareString(ascending: boolean, a: string | null | undefined, b: string | null | undefined) {
    if (a == null || b == undefined) {
      a = ""
    }
    if (b == null || b == undefined) {
      b = ""
    }
    if (ascending) {
      return a.localeCompare(b)
    } else {
      return b.localeCompare(a)
    }
  }

  useEffect(() => {
    const sortFilteredData = {
      name: (a: Artist | Venue, b: Artist | Venue) => {
        const aName = a.name
        const bName = b.name
        return compareString(sorting.ascending, aName, bName)
      },
      featured: (a: Artist | Venue, b: Artist | Venue) => {
        const aFeatured = a.featured
        const bFeatured = b.featured
        return compareBool(sorting.ascending, aFeatured, bFeatured)
      },
      active: (a: Artist | Venue, b: Artist | Venue) => {
        const aActive = a.active
        const bActive = b.active
        return compareBool(sorting.ascending, aActive, bActive)
      },
      address: (a: Venue, b: Venue) => {
        const aAddress = a.address
        const bAddress = b.address
        return compareString(sorting.ascending, aAddress, bAddress)
      },
      city: (a: Venue, b: Venue) => {
        const aCity = a.city
        const bCity = b.city
        return compareString(sorting.ascending, aCity, bCity)
      },
      instagramHandle: (a: Artist | Venue | EventWithArtistVenue, b: Artist | Venue | EventWithArtistVenue) => {
        const aInsta = a.instagramHandle?.replace('@', '');
        const bInsta = b.instagramHandle?.replace('@', '');
        return compareString(sorting.ascending, aInsta, bInsta)
      },
      website: (a: Artist | Venue, b: Artist | Venue) => {
        const aWebsite = a.website?.replace(/http(s)?(:)?(\/\/)?|(\/\/)?(www\.)?/g, '')
        const bWebsite = b.website?.replace(/http(s)?(:)?(\/\/)?|(\/\/)?(www\.)?/g, '')
        return compareString(sorting.ascending, aWebsite, bWebsite)
      },
      date: (a: EventWithArtistVenue, b: EventWithArtistVenue) => {
        const aDate = a.startDate.toString()
        const bDate = b.startDate.toString()
        if (sorting.ascending) {
          return aDate.localeCompare(bDate, undefined, {
            numeric: true,
            sensitivity: 'base'
          })
        } else {
          return bDate.localeCompare(aDate, undefined, {
            numeric: true,
            sensitivity: 'base'
          })
        }
      },
      genre: (a: Artist, b: Artist) => {
        const aGenre = a.genre
        const bGenre = b.genre
        return compareString(sorting.ascending, aGenre, bGenre)
      },
      'venue.name': (a: EventWithArtistVenue, b: EventWithArtistVenue) => {
        const aName = a.venue.name;
        const bName = b.venue.name;
        return compareString(sorting.ascending, aName, bName)
      },
      'artist.name': (a: EventWithArtistVenue, b: EventWithArtistVenue) => {
        const aName = a.artist.name;
        const bName = b.artist.name;
        return compareString(sorting.ascending, aName, bName)
      },

    }

    const sortData = sortFilteredData[sorting.key]

    // If we haven't searched yet or if we've cleared the search, return all items
    if (deepEqual(searchData, initialSearchData) && data.items?.length) {
      return setFilteredItems(data.items.sort(sortData))
    }

    if (data.items) {
      // TODO: Dry this up
      const filterItems = () => {
        if (data.type === DataType.EVENT) {
          return data.items
            .filter(
              (item: EventWithArtistVenue) =>
                filterName(item) &&
                filterVenue(item) &&
                filterWebsite(item) &&
                filterInstagramHandle(item)
            )
          .sort(sortData)
        } else if (data.type === DataType.ARTIST) {
          return data.items
            .filter(
              (item: Artist) =>
                filterName(item) &&
                filterInstagramHandle(item) &&
                filterWebsite(item)
            )
          .sort(sortData)
        } else if (data.type === DataType.VENUE) {
          return data.items
            .filter(
              (item: Venue) =>
                filterName(item) &&
                filterInstagramHandle(item) &&
                filterWebsite(item)
            )
          .sort(sortData)
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
