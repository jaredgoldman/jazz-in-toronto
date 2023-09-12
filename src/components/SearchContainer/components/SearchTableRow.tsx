import { useState } from 'react'
// Components
import { Table, Button } from '@radix-ui/themes'
import Dialogue from '~/components/Dialogue'
import EventForm from '~/components/Forms/Event'
import ArtistForm from '~/components/Forms/Artist'
import VenueForm from '~/components/Forms/Venue'
// Types
import { DataType } from '~/types/enums'
import { type RowData } from '../types'
import type { EventWithArtistVenue, Artist, Venue, Items } from '~/types/data'
import type useEventForm from '~/components/Forms/Event/hooks/useEventForm'
import type useArtistForm from '~/components/Forms/Artist/hooks/useArtistForm'
import type useVenueForm from '~/components/Forms/Venue/hooks/useVenueForm'
// Utils
import { getFormattedTime } from '~/utils/date'
import { isEventWithArtistVenue, isUseEventFormProps } from '~/utils/typeguards'
import { useTheme } from 'next-themes'
import { api } from '~/utils/api'

interface Props {
    data: RowData
    featured?: string
    onEdit?: () => Promise<void>
    canEditFormState?: boolean
    successAttribute?: 'artistId' | 'approved'
    editFormHook:
        | typeof useEventForm
        | typeof useArtistForm
        | typeof useVenueForm
    setItems: (items: Items) => void
    items: Array<EventWithArtistVenue | Artist | Venue>
    showFeatured?: boolean
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
    onEdit,
    editFormHook,
    canEditFormState = false,
    successAttribute = 'artistId',
    setItems,
    items,
    showFeatured
}: Props) {
    const { theme } = useTheme()
    const { mutateAsync } = api.event.update.useMutation()

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
                    <Table.Cell key="date">{`${item.startDate.toDateString()} - ${getFormattedTime(
                        item.startDate
                    )} - ${getFormattedTime(item.endDate)}`}</Table.Cell>
                    <Table.Cell key="artistName">{item.artist.name}</Table.Cell>
                    <Table.Cell key="website">
                        {item.website ? item.website : ''}
                    </Table.Cell>
                    <Table.Cell key="instagramHandle">
                        {item.instagramHandle ? item.instagramHandle : ''}
                    </Table.Cell>
                    <Table.Cell key="cancelled">
                        {item.cancelled ? 'Yes' : 'No'}
                    </Table.Cell>
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
        if (
            canEditFormState &&
            type === DataType.EVENT &&
            isUseEventFormProps(editFormProps)
        ) {
            const editedRow = editFormProps.getValues()
            const updatedItems = items.map((stateItem) => {
                if (stateItem.id === item.id) {
                    const data = {
                        ...stateItem,
                        ...editedRow,
                        artist: editFormProps.getSpecificArtistData()
                    }
                    return data
                } else {
                    return stateItem
                }
            })
            setItems(updatedItems as EventWithArtistVenue[])
        } else {
            // Otherwise just update indiivudal row and
            // run onEdit which is currently usually a call to
            // refetch data
            await editFormProps.submit()
            onEdit && (await onEdit())
        }
    }

    // If form state is editable, show rows that have an artist as green
    const successShade = theme === 'dark' ? 'bg-green-900' : 'bg-green-100'

    const rowShadeStyle =
        canEditFormState &&
        isEventWithArtistVenue(item) &&
        item[successAttribute]
            ? successShade
            : ''

    const [rowShade, setRowShade] = useState<
        'bg-green-900' | 'bg-green-100' | ''
    >(rowShadeStyle)

    const handleApprove = async () => {
        if (!isEventWithArtistVenue(item)) return
        await mutateAsync({
            id: item.id,
            approved: !item.approved
        })
        setRowShade(rowShade === successShade ? '' : successShade)
    }

    const isApproved =
        isEventWithArtistVenue(item) && (item?.approved || rowShade)

    return (
        <Table.Row align="center" key={item.id} className={rowShade}>
            {cols}
            {showFeatured && (
                <Table.Cell key="featured">
                    {item?.featured ? 'Yes' : 'No'}
                </Table.Cell>
            )}
            <Table.Cell key="edit" align="center">
                <Dialogue
                    title="Edit"
                    triggerLabel="Edit"
                    onSubmit={onEditRow}
                    component={editComp}
                />

                {isEventWithArtistVenue(item) &&
                    successAttribute === 'approved' && (
                        <Button
                            mt="2"
                            onClick={handleApprove}
                            color={isApproved ? 'red' : 'green'}
                        >
                            {isApproved ? 'Unapprove' : 'Approve'}
                        </Button>
                    )}
            </Table.Cell>
        </Table.Row>
    )
}
