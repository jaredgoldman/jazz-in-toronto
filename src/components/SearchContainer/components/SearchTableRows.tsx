// Components
import { useRef } from 'react'
import { Table } from '@radix-ui/themes'
import Dialogue from '~/components/Dialogue'
import EventForm from '~/components/Forms/Event'
import ArtistForm from '~/components/Forms/Artist'
import VenueForm from '~/components/Forms/Venue'
// Types
import {
    type EventWithArtistVenue,
    type Artist,
    type Venue
} from '~/types/data'
import { type QueryObserverResult } from '@tanstack/react-query'
import { DataType } from '~/types/enums'
// Utils
import { getFormattedTime } from '~/utils/date'
import { type EventFormValues } from '~/components/Forms/Event/hooks/useEventForm'

interface RowProps<T> {
    item: T
    featured?: string
    setFeatured: (id: string, type: DataType) => void
    refetch?: () => Promise<QueryObserverResult<unknown>>
    editCallback?: (data: EventFormValues) => void
}

interface InnerFormRef {
    submitForm: () => Promise<void>
}

export const EventRow = ({
    item,
    featured,
    setFeatured,
    refetch,
    editCallback
}: RowProps<EventWithArtistVenue>): JSX.Element => {
    const eventFormRef = useRef<InnerFormRef | null>(null)
    return (
        <Table.Row align="center">
            <Table.Cell>{item.name}</Table.Cell>
            <Table.Cell>{item.featured ? 'Yes' : 'No'}</Table.Cell>
            <Table.Cell>{item.venue.name}</Table.Cell>
            <Table.Cell>{item.startDate.toDateString()}</Table.Cell>
            <Table.Cell>{`${getFormattedTime(
                item.startDate
            )} - ${getFormattedTime(item.endDate)}`}</Table.Cell>
            <Table.Cell>{item.artist.name}</Table.Cell>
            <Table.Cell>{item.website ? item.website : ''}</Table.Cell>
            <Table.Cell>
                {item.instagramHandle ? item.instagramHandle : ''}
            </Table.Cell>
            <Table.Cell>{item.cancelled}</Table.Cell>
            <Table.Cell className="text-center">
                <input
                    type="checkbox"
                    className="h-full"
                    checked={item.id === featured}
                    onChange={() => setFeatured(item.id, DataType.EVENT)}
                />
            </Table.Cell>
            <Table.Cell justify="center">
                <Dialogue
                    title="Edit"
                    triggerLabel="Edit"
                    formRef={eventFormRef}
                    refetch={refetch}
                    component={
                        <EventForm
                            externalOnSubmit={editCallback}
                            ref={eventFormRef}
                            currentValues={item}
                            externalSubmit={true}
                        />
                    }
                />
            </Table.Cell>
        </Table.Row>
    )
}

export const ArtistRow = ({
    item,
    featured,
    setFeatured,
    refetch
}: RowProps<Artist>) => {
    const artistFormRef = useRef<InnerFormRef | null>(null)
    return (
        <Table.Row align="center">
            <Table.Cell>{item.name}</Table.Cell>
            <Table.Cell>{item.genre ? item.genre : ''}</Table.Cell>
            <Table.Cell>
                {item.instagramHandle ? item.instagramHandle : ''}
            </Table.Cell>
            <Table.Cell>{item.website ? item.website : ''}</Table.Cell>
            <Table.Cell>{item.active}</Table.Cell>
            <Table.Cell>
                <input
                    type="checkbox"
                    checked={item.id === featured}
                    onChange={() => setFeatured(item.id, DataType.ARTIST)}
                />
            </Table.Cell>

            <Table.Cell>
                <Dialogue
                    title="Edit"
                    triggerLabel="Edit"
                    formRef={artistFormRef}
                    refetch={refetch}
                    component={
                        <ArtistForm
                            ref={artistFormRef}
                            currentValues={item}
                            externalSubmit={true}
                        />
                    }
                />
            </Table.Cell>
        </Table.Row>
    )
}

export const VenueRow = ({
    item,
    featured,
    setFeatured,
    refetch
}: RowProps<Venue>) => {
    const venueFormRef = useRef<InnerFormRef | null>(null)
    return (
        <Table.Row align="center">
            <Table.Cell>{item.name}</Table.Cell>
            <Table.Cell>{item.address}</Table.Cell>
            <Table.Cell>{item.city}</Table.Cell>
            <Table.Cell>{item.website ? item.website : ''}</Table.Cell>
            <Table.Cell>
                {item.instagramHandle ? item.instagramHandle : ''}
            </Table.Cell>
            <Table.Cell>{item.active ? 'Yes' : 'No'}</Table.Cell>
            <Table.Cell>
                <input
                    type="checkbox"
                    checked={item.id === featured}
                    onChange={() => setFeatured(item.id, DataType.VENUE)}
                />
            </Table.Cell>

            <Table.Cell>
                <Dialogue
                    title="Edit"
                    triggerLabel="Edit"
                    formRef={venueFormRef}
                    refetch={refetch}
                    component={
                        <VenueForm
                            ref={venueFormRef}
                            currentValues={item}
                            externalSubmit={true}
                        />
                    }
                />
            </Table.Cell>
        </Table.Row>
    )
}
