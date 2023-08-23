// Libraries
import { useEffect, useState } from 'react'
import { Table } from '@radix-ui/themes'
import SearchTableHeader from './SearchTableHeader'
import tableSchema from '../data/tableSchema'
// Components
import { EventRow, ArtistRow, VenueRow } from './SearchTableRows'
// Types
import { type QueryObserverResult } from '@tanstack/react-query'
import { DataType } from '~/types/enums'
import type { Artist, EventWithArtistVenue, Venue } from '~/types/data'
// Utils
import { api } from '~/utils/api'

interface Props {
    itemsData: Array<Venue | Artist | EventWithArtistVenue>
    dataType: DataType
    featuredItem?: Venue | Artist | EventWithArtistVenue | null
    refetch?: () => Promise<QueryObserverResult<unknown>>
    canEditBeforeMutation?: boolean
}

export default function SearchTable({
    itemsData,
    dataType,
    featuredItem,
    refetch
}: Props): JSX.Element {
    const [items, setItems] = useState<
        Array<Venue | EventWithArtistVenue | Artist>
    >([])
    const eventSetFeaturedMutation = api.event.setFeatured.useMutation()
    const venueSetFeaturedMutation = api.venue.setFeatured.useMutation()
    const bandSetFeaturedMutation = api.artist.setFeatured.useMutation()
    const [featured, setFeatured] = useState<string | undefined>(
        featuredItem?.id
    )

    useEffect(() => {
        if (itemsData) {
            setItems(itemsData)
        }
    }, [itemsData])

    const handleSetFeatured = (id: string, type: DataType) => {
        setFeatured(id)
        switch (type) {
            case DataType.EVENT:
                eventSetFeaturedMutation.mutate({ id })
                break
            case DataType.VENUE:
                venueSetFeaturedMutation.mutate({ id })
                break
            case DataType.ARTIST:
                bandSetFeaturedMutation.mutate({ id })
                break
        }
    }
    // We can assume items will be all of one type
    // however let's just make TS happy by typeguarding all items
    const rows = items.map((item) => {
        if (dataType === DataType.EVENT) {
            return (
                <EventRow
                    item={item as EventWithArtistVenue}
                    key={item.id}
                    featured={featured}
                    setFeatured={handleSetFeatured}
                    refetch={refetch}
                />
            )
        } else if (dataType === DataType.ARTIST) {
            return (
                <ArtistRow
                    item={item as Artist}
                    key={item.id}
                    featured={featured}
                    setFeatured={handleSetFeatured}
                    refetch={refetch}
                />
            )
        } else {
            return (
                <VenueRow
                    item={item as Venue}
                    key={item.id}
                    featured={featured}
                    setFeatured={handleSetFeatured}
                    refetch={refetch}
                />
            )
        }
    })

    return (
        <Table.Root>
            <SearchTableHeader cols={tableSchema[dataType]} />
            <Table.Body>
                {items.length ? (
                    rows
                ) : (
                    <Table.Row>
                        <Table.Cell>No results</Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
        </Table.Root>
    )
}
