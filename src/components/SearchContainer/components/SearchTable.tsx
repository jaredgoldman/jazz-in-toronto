// Libraries
import { useState } from 'react'
import { Table } from '@radix-ui/themes'
// Components
import {
    EventHeader,
    EventRow,
    BandHeader,
    BandRow,
    VenueHeader,
    VenueRow
} from './SearchTableRows'
// Types
import { type QueryObserverResult } from '@tanstack/react-query'
import { DataType } from '~/types/enums'
import {
    type Band,
    type EventWithBandVenue,
    type Venue,
    type Item
} from '~/types/data'
// Utils
import { api } from '~/utils/api'
// Context

interface Props {
    items: Array<Item>
    dataType: DataType
    featuredItem?: Item | null
    refetch?: () => Promise<QueryObserverResult<unknown>>
}

const headers = {
    [DataType.EVENT]: <EventHeader />,
    [DataType.BAND]: <BandHeader />,
    [DataType.VENUE]: <VenueHeader />,
    [DataType.ADMIN]: null
}

export default function SearchTable({
    items,
    dataType,
    featuredItem,
    refetch
}: Props): JSX.Element {
    const eventSetFeaturedMutation = api.event.setFeatured.useMutation()
    const venueSetFeaturedMutation = api.venue.setFeatured.useMutation()
    const bandSetFeaturedMutation = api.band.setFeatured.useMutation()
    const [featured, setFeatured] = useState<string | undefined>(
        featuredItem?.id
    )

    const handleSetFeatured = (id: string, type: DataType) => {
        setFeatured(id)
        switch (type) {
            case DataType.EVENT:
                eventSetFeaturedMutation.mutate({ id })
                break
            case DataType.VENUE:
                venueSetFeaturedMutation.mutate({ id })
                break
            case DataType.BAND:
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
                    item={item as EventWithBandVenue}
                    key={item.id}
                    featured={featured}
                    setFeatured={handleSetFeatured}
                    refetch={refetch}
                />
            )
        } else if (dataType === DataType.BAND) {
            return (
                <BandRow
                    item={item as Band}
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

    const header = headers[dataType]

    return (
        <Table.Root>
            <Table.Header>{header}</Table.Header>
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
