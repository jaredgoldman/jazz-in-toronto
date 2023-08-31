// Libraries
import { useEffect, useState } from 'react'
import { Flex, Button, Callout, Table } from '@radix-ui/themes'
import SearchTableHeader from './SearchTableHeader'
import tableSchema from '../data/tableSchema'
// Components
import SearchTableRow from './SearchTableRow'
import Loading from '~/components/Loading'
import { InfoCircledIcon } from '@radix-ui/react-icons'
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
    canEditFormState?: boolean
    venueId?: string
}

export default function SearchTable({
    data,
    isLoading,
    featuredItem,
    onEdit,
    canEditFormState = false,
    venueId
}: Props): JSX.Element {
    const [items, setItems] = useState<
        Array<Venue | EventWithArtistVenue | Artist>
    >([])
    const [canSubmit, setCanSubmit] = useState<boolean>(false)
    const eventSetFeaturedMutation = api.event.setFeatured.useMutation()
    const venueSetFeaturedMutation = api.venue.setFeatured.useMutation()
    const bandSetFeaturedMutation = api.artist.setFeatured.useMutation()
    const addEventMutation = api.event.createMany.useMutation()
    const addVenueMutation = api.venue.createMany.useMutation()
    const addBandMutation = api.artist.createMany.useMutation()
    const [featured, setFeatured] = useState<string | undefined>(
        featuredItem?.id
    )

    // Keep items in state so we can edit them in place and submit them all at once
    useEffect(() => {
        if (data.items.length) {
            setItems(data.items)
        }
    }, [data.items])

    const handleSubmitStateEntries = async () => {
        switch (data.type) {
            case DataType.EVENT:
                const events = (items as EventWithArtistVenue[]).map((item) => {
                    return {
                        ...item,
                        artistId: item.artist.id,
                        venueId: venueId || item.venue.id
                    }
                })
                await addEventMutation.mutateAsync(events)
                break
            case DataType.VENUE:
                await addVenueMutation.mutateAsync(items as Venue[])
                break
            case DataType.ARTIST:
                await addBandMutation.mutateAsync(items as Artist[])
                break
        }
    }

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
                canEditFormState={canEditFormState}
                setItems={setItems}
                items={items}
            />
        )
    })

    useEffect(() => {
        if (data.type === DataType.EVENT) {
            const itemMissingData = (items as EventWithArtistVenue[]).some(
                (item) => {
                    return !item.artistId || !item.venueId
                }
            )

            setCanSubmit(!itemMissingData)
        }
    }, [items])

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
            {canEditFormState && (
                <Flex width="100%" direction="column">
                    {!canSubmit && (
                        <Callout.Root mb="2">
                            <Callout.Icon>
                                <InfoCircledIcon />
                            </Callout.Icon>
                            <Callout.Text>
                                You must add a venue and artist to each event
                                before you can submit
                            </Callout.Text>
                        </Callout.Root>
                    )}
                    <Button
                        disabled={!canSubmit}
                        onClick={handleSubmitStateEntries}
                    >
                        Save Events
                    </Button>
                </Flex>
            )}
        </>
    )
}
