// Components
import { Table } from '@radix-ui/themes'
import Dialogue from '~/components/Dialogue'
import EventForm from '~/components/Forms/Event'
import ArtistForm from '~/components/Forms/Artist'
import VenueForm from '~/components/Forms/Venue'
// Types
import { DataType } from '~/types/enums'
import { type RowData } from '../types'
import type { EventWithArtistVenue, Artist, Venue } from '~/types/data'
import type useEventForm from '~/components/Forms/Event/hooks/useEventForm'
import type useArtistForm from '~/components/Forms/Artist/hooks/useArtistForm'
import type useVenueForm from '~/components/Forms/Venue/hooks/useVenueForm'
// Utils
import { getFormattedTime } from '~/utils/date'

interface Props {
    data: RowData
    featured?: string
    onEdit?: () => Promise<void>
    setFeatured: (id: string, type: DataType) => void
    canEditFormState?: boolean
    editFormHook:
        | typeof useEventForm
        | typeof useArtistForm
        | typeof useVenueForm
    setItems: (items: Array<EventWithArtistVenue | Artist | Venue>) => void
    items: Array<EventWithArtistVenue | Artist | Venue>
}

const getEditFormCellandProps = (
    data: RowData,
    editFormHook: Props['editFormHook']
) => {
    switch (data.type) {
        case DataType.EVENT:
            const eventFormProps = (editFormHook as typeof useEventForm)(
                data.item
            )
            return {
                editComp: (
                    <EventForm {...eventFormProps} showSubmitButton={false} />
                ),
                editFormProps: eventFormProps
            }
        case DataType.VENUE:
            const venueFormProps = (editFormHook as typeof useVenueForm)(
                data.item
            )
            return {
                editComp: (
                    <VenueForm {...venueFormProps} showSubmitButton={false} />
                ),
                editFormProps: venueFormProps
            }
        case DataType.ARTIST:
            const artistFormProps = (editFormHook as typeof useArtistForm)(
                data.item
            )
            return {
                editComp: (
                    <ArtistForm {...artistFormProps} showSubmitButton={false} />
                ),
                editFormProps: artistFormProps
            }
    }
}

export default function SearchTableRow({
    data,
    featured,
    setFeatured,
    onEdit,
    editFormHook,
    canEditFormState = false,
    setItems,
    items
}: Props) {
    let cols

    const { item, type } = data
    const { editComp, editFormProps } = getEditFormCellandProps(
        data,
        editFormHook
    )

    switch (type) {
        case DataType.EVENT:
            cols = (
                <>
                    <Table.Cell key="name">{item.name}</Table.Cell>
                    <Table.Cell key="venueName">{item.venue.name}</Table.Cell>
                    <Table.Cell key="startDate">
                        {item.startDate.toDateString()}
                    </Table.Cell>
                    <Table.Cell>{`${getFormattedTime(
                        item.startDate
                    )} - ${getFormattedTime(item.endDate)}`}</Table.Cell>
                    <Table.Cell key="artistName">{item.artist.name}</Table.Cell>
                    <Table.Cell key="website">
                        {item.website ? item.website : ''}
                    </Table.Cell>
                    <Table.Cell key="instagramHandle">
                        {item.instagramHandle ? item.instagramHandle : ''}
                    </Table.Cell>
                    <Table.Cell key="cancelled">{item.cancelled}</Table.Cell>
                </>
            )
            break
        case DataType.VENUE:
            cols = (
                <>
                    <Table.Cell key="name">{item.name}</Table.Cell>
                    <Table.Cell key="address">{item.address}</Table.Cell>
                    <Table.Cell key="city">{item.city}</Table.Cell>
                    <Table.Cell key="website">
                        {item.website ? item.website : ''}
                    </Table.Cell>
                    <Table.Cell key="instagramHandle">
                        {item.instagramHandle ? item.instagramHandle : ''}
                    </Table.Cell>
                    <Table.Cell key="active">
                        {item.active ? 'Yes' : 'No'}
                    </Table.Cell>
                </>
            )
            break
        case DataType.ARTIST:
            cols = (
                <>
                    <Table.Cell key="name">{item.name}</Table.Cell>
                    <Table.Cell key="genere">
                        {item.genre ? item.genre : ''}
                    </Table.Cell>
                    <Table.Cell key="instagramHandle">
                        {item.instagramHandle ? item.instagramHandle : ''}
                    </Table.Cell>
                    <Table.Cell key="website">
                        {item.website ? item.website : ''}
                    </Table.Cell>
                    <Table.Cell key="active">{item.active}</Table.Cell>
                </>
            )
            break
    }

    const onEditRow = async () => {
        // Allow for form state to be edited before <submission
        // Added the eventscraper logic currently
        if (canEditFormState) {
            const editedRow = editFormProps.getValues()
            const updatedItems = items.map(
                (stateItem: EventWithArtistVenue | Artist | Venue) => {
                    if (stateItem.id === item.id) {
                        return editedRow
                    } else {
                        return stateItem
                    }
                }
            )
            setItems(
                updatedItems as Array<EventWithArtistVenue | Artist | Venue>
            )
        } else {
            await editFormProps.submit()
            onEdit && (await onEdit())
        }
    }

    return (
        <Table.Row align="center" key={item.id}>
            <Table.Cell key="featured">
                <input
                    type="checkbox"
                    checked={item.id === featured}
                    onChange={() => setFeatured(item.id, type)}
                />
            </Table.Cell>
            {cols}
            <Table.Cell key="edit">
                <Dialogue
                    title="Edit"
                    triggerLabel="Edit"
                    onSubmit={onEditRow}
                    component={editComp}
                />
            </Table.Cell>
        </Table.Row>
    )
}
