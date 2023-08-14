// Components
import { useRef } from 'react'
import { Table } from '@radix-ui/themes'
import Dialogue from '~/components/Dialogue'
import EventForm from '~/components/Forms/Event'
import BandForm from '~/components/Forms/Band'
import VenueForm from '~/components/Forms/Venue'
// Types
import { type EventWithBandVenue, type Band, type Venue } from '~/types/data'
// Utils
import { getFormattedTime } from '~/utils/date'
import { DataType } from '~/types/enums'

interface RowProps<T> {
    item: T
    featured?: string
    setFeatured: (id: string, type: DataType) => void
    refetch?: () => Promise<void>
}

interface InnerFormRef {
    submitForm: () => Promise<void>
}

export const EventHeader = (): JSX.Element => {
    return (
        <Table.Row align="center">
            <Table.ColumnHeaderCell>Event Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Featured</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Venue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Time</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Band</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Website</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Insta</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Cancelled</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Featured</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
        </Table.Row>
    )
}

export const EventRow = ({
    item,
    featured,
    setFeatured,
    refetch
}: RowProps<EventWithBandVenue>): JSX.Element => {
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
            <Table.Cell>{item.band.name}</Table.Cell>
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

export const BandHeader = (): JSX.Element => {
    return (
        <Table.Row align="center">
            <Table.RowHeaderCell>Name</Table.RowHeaderCell>
            <Table.RowHeaderCell>Genre</Table.RowHeaderCell>
            <Table.RowHeaderCell>instagramHandle</Table.RowHeaderCell>
            <Table.RowHeaderCell>Website</Table.RowHeaderCell>
            <Table.RowHeaderCell>Active</Table.RowHeaderCell>
            <Table.RowHeaderCell>Featured</Table.RowHeaderCell>

            <Table.RowHeaderCell></Table.RowHeaderCell>
        </Table.Row>
    )
}

export const BandRow = ({
    item,
    featured,
    setFeatured,
    refetch
}: RowProps<Band>) => {
    const bandFormRef = useRef<InnerFormRef | null>(null)
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
                    onChange={() => setFeatured(item.id, DataType.BAND)}
                />
            </Table.Cell>

            <Table.Cell>
                <Dialogue
                    title="Edit"
                    triggerLabel="Edit"
                    formRef={bandFormRef}
                    refetch={refetch}
                    component={
                        <BandForm
                            ref={bandFormRef}
                            currentValues={item}
                            externalSubmit={true}
                        />
                    }
                />
            </Table.Cell>
        </Table.Row>
    )
}

export const VenueHeader = (): JSX.Element => {
    return (
        <Table.Row align="center">
            <Table.RowHeaderCell>Name</Table.RowHeaderCell>
            <Table.RowHeaderCell>Address</Table.RowHeaderCell>
            <Table.RowHeaderCell>City</Table.RowHeaderCell>
            <Table.RowHeaderCell>Website</Table.RowHeaderCell>
            <Table.RowHeaderCell>instagramHandle</Table.RowHeaderCell>
            <Table.RowHeaderCell>Active</Table.RowHeaderCell>
            <Table.RowHeaderCell>Featured</Table.RowHeaderCell>
            <Table.RowHeaderCell></Table.RowHeaderCell>
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
