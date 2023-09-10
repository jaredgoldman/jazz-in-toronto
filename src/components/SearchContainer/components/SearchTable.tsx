// Libraries
import { useEffect, useState } from 'react'
import { Flex, Button, Callout, Table, Box } from '@radix-ui/themes'
import SearchTableHeader from './SearchTableHeader'
import tableSchema from '../data/tableSchema'
// Components
import SearchTableRow from './SearchTableRow'
import Loading from '~/components/Loading'
import { InfoCircledIcon } from '@radix-ui/react-icons'
// Types
import type { TableData, RowData } from '../types'
import { DataType } from '~/types/enums'
import type { Artist, EventWithArtistVenue, Items, Venue } from '~/types/data'
// Utils
import { api } from '~/utils/api'
import { useEvent } from '~/hooks/useEvent'
import useEventForm from '~/components/Forms/Event/hooks/useEventForm'
import { isEventWithArtistVenue } from '~/utils/typeguards'

interface Props {
    data: TableData
    artists?: Artist[]
    isLoading: boolean
    onEdit?: () => Promise<void>
    canEditFormState?: boolean
    venueId?: string
    showFeatured?: boolean
}

export default function SearchTable({
    data,
    artists,
    isLoading,
    onEdit,
    canEditFormState = false,
    venueId,
    showFeatured = true
}: Props): JSX.Element {
    const [items, setItems] = useState<Items>([])
    const [canSubmit, setCanSubmit] = useState<boolean>(false)
    const addEventsMutation = api.event.createMany.useMutation()
    const addVenuesMutation = api.venue.createMany.useMutation()
    const addBandsMutation = api.artist.createMany.useMutation()

    // Keep items in state so we can edit them in place and submit them all at once
    useEffect(() => {
        if (data.items) {
            setItems(data.items)
        }
    }, [data.items])

    const addArtistToStateItems = useEvent((items: Items) => {
        items.forEach((item) => {
            if (isEventWithArtistVenue(item) && artists) {
                const artist = artists.find((artist) => {
                    return item.name
                        .toLowerCase()
                        .includes(artist.name.toLowerCase())
                })
                if (artist) {
                    item.artistId = artist.id
                    item.artist = artist
                }
            }
        })
        setItems(items)
    })

    // Search through current artists and attempt to add an artist to each event
    useEffect(() => {
        if (canEditFormState && artists?.length && items.length) {
            addArtistToStateItems(items)
        }
    }, [items, artists, addArtistToStateItems, canEditFormState])

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
                await addEventsMutation.mutateAsync(events)
                break
            case DataType.VENUE:
                await addVenuesMutation.mutateAsync(items as Venue[])
                break
            case DataType.ARTIST:
                await addBandsMutation.mutateAsync(items as Artist[])
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
                onEdit={onEdit}
                editFormHook={getFormHook(data.type)}
                canEditFormState={canEditFormState}
                setItems={setItems}
                items={items}
                showFeatured={showFeatured}
            />
        )
    })

    // If we can edit items in state and all events have a artist added
    // let admin submmit
    useEffect(() => {
        if (data.type === DataType.EVENT) {
            const itemMissingData = (items as EventWithArtistVenue[]).some(
                (item) => {
                    return !item.artistId || !item.venueId
                }
            )

            setCanSubmit(!itemMissingData)
        }
    }, [items, data.type])

    return (
        <Box px="3" pb="3">
            {isLoading ? (
                <Loading />
            ) : (
                <Table.Root>
                    <SearchTableHeader
                        cols={tableSchema[data.type]}
                        showFeatured={showFeatured}
                    />
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
                                You must add an artist to each event before you
                                can submit
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
        </Box>
    )
}
