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
import { type Item } from '~/types/data'
import { type ModalContextType } from '~/components/Modal/types'
// Utils
import { isBand, isEvent } from '~/utils/typeguards'
import { api } from '~/utils/api'
// Context
import { ModalContext } from '~/components/Modal/context/ModalContext'

interface Props {
    items: Array<Item>
    featuredItem?: Item | null
    headerType: DataType
}

const headers = {
    [DataType.EVENT]: <EventHeader />,
    [DataType.BAND]: <BandHeader />,
    [DataType.VENUE]: <VenueHeader />,
    [DataType.ADMIN]: null
}

export default function SearchTable({
    items,
    headerType,
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
        if (isEvent(item)) {
            return (
                <EventRow
                    item={item}
                    key={item.id}
                    handleModalForm={handleModalForm}
                    featured={featured}
                    setFeatured={handleSetFeatured}
                />
            )
        } else if (isBand(item)) {
            return (
                <BandRow
                    item={item}
                    key={item.id}
                    handleModalForm={handleModalForm}
                    featured={featured}
                    setFeatured={handleSetFeatured}
                />
            )
        } else {
            return (
                <VenueRow
                    item={item}
                    key={item.id}
                    handleModalForm={handleModalForm}
                    featured={featured}
                    setFeatured={handleSetFeatured}
                />
            )
        }
    })

    const header = headers[headerType]

    return (
        <table className="table w-full border-collapse rounded-lg bg-white shadow-md">
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
