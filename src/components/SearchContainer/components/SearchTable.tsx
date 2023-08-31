// Libraries
import { useEffect, useState } from 'react'
import { Table } from '@radix-ui/themes'
import SearchTableHeader from './SearchTableHeader'
import tableSchema from '../data/tableSchema'
// Components
import SearchTableRow from './SearchTableRow'
import Loading from '~/components/Loading'
// Types
import type { TableData, RowData } from '../types'
import { DataType } from '~/types/enums'
import type { Artist, EventWithArtistVenue, Venue } from '~/types/data'
// Utils
import { api } from '~/utils/api'
import useEventForm from '~/components/Forms/Event/hooks/useEventForm'

interface Props {
    data: TableData
    isLoading: boolean
    onEdit?: () => Promise<void>
    featuredItem?: Venue | Artist | EventWithArtistVenue | null
}

export default function SearchTable({
    data,
    isLoading,
    featuredItem,
    onEdit
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
        if (data.items.length) {
            setItems(data.items)
        }
    }, [data.items])

    const handleSetFeatured = (id: string) => {
        setFeatured(id)
        switch (data.type) {
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

    const getFormHook = (type: DataType) => {
        switch (type) {
            case DataType.EVENT:
                return useEventForm
            case DataType.VENUE:
                return useEventForm
            case DataType.ARTIST:
                return useEventForm
        }
    }

    const rows = items?.map((item) => {
        return (
            <SearchTableRow
                key={item.id}
                data={{ type: data.type, item } as RowData}
                featured={featured}
                setFeatured={handleSetFeatured}
                onEdit={onEdit}
                editFormHook={getFormHook(data.type)}
            />
        )
    })

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <Table.Root>
                    <SearchTableHeader cols={tableSchema[data.type]} />
                    <Table.Body>
                        {rows.length ? (
                            rows
                        ) : (
                            <Table.Row>
                                <Table.Cell>No results</Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table.Root>
            )}
        </>
    )
}
