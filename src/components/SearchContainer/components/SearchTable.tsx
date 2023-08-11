// Libraries
import { useContext, useState } from 'react'
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
import { DataType } from '~/types/enums'
import {
    type Band,
    type EventWithBandVenue,
    type Venue,
    type Item
} from '~/types/data'
import { type ModalContextType } from '~/components/Modal/types'
// Utils
import { api } from '~/utils/api'
// Context
import { ModalContext } from '~/components/Modal/context/ModalContext'

interface Props {
    items: Array<Item>
    dataType: DataType
    featuredItem?: Item | null
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
    featuredItem
}: Props): JSX.Element {
    const eventSetFeaturedMutation = api.event.setFeatured.useMutation()
    const venueSetFeaturedMutation = api.venue.setFeatured.useMutation()
    const bandSetFeaturedMutation = api.band.setFeatured.useMutation()
    const [featured, setFeatured] = useState<string | undefined>(
        featuredItem?.id
    )

    const { handleModalForm } = useContext(ModalContext) as ModalContextType

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
                    handleModalForm={handleModalForm}
                    featured={featured}
                    setFeatured={handleSetFeatured}
                />
            )
        } else if (dataType === DataType.BAND) {
            return (
                <BandRow
                    item={item as Band}
                    key={item.id}
                    handleModalForm={handleModalForm}
                    featured={featured}
                    setFeatured={handleSetFeatured}
                />
            )
        } else {
            return (
                <VenueRow
                    item={item as Venue}
                    key={item.id}
                    handleModalForm={handleModalForm}
                    featured={featured}
                    setFeatured={handleSetFeatured}
                />
            )
        }
    })

    const header = headers[dataType]

    return (
        <table className="block table-auto border-collapse overflow-x-auto whitespace-nowrap rounded-lg text-white">
            <thead>{header}</thead>
            <tbody>
                {items.length ? (
                    rows
                ) : (
                    <tr>
                        <td>No results</td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}
