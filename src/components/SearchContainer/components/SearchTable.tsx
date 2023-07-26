// Libraries
import { useContext } from 'react'
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
import { DataTypes } from '~/types/enums'
import { type Items } from '~/types/data'
// Utils
import { isBand, isEvent } from '~/utils/typeguards'
// Context
import { ModalContext } from '~/components/Modal/context/ModalContext'

interface Props {
    items: Items
}

const headers = {
    [DataTypes.EVENT]: <EventHeader />,
    [DataTypes.BAND]: <BandHeader />,
    [DataTypes.VENUE]: <VenueHeader />
}

export default function SearchTable({ items }: Props): JSX.Element {
    const { handleModalForm } = useContext(ModalContext)

    const rowProps = {
        handleModalForm
    }

    let dataType = DataTypes.EVENT

    // We can assume items will be all of one type
    // however let's just make TS happy by typeguarding all items
    const rows = items.map((item, i) => {
        if (isEvent(item)) {
            i === 0 && (dataType = DataTypes.EVENT)
            return <EventRow item={item} {...rowProps} />
        } else if (isBand(item)) {
            i === 0 && (dataType = DataTypes.BAND)
            return <BandRow item={item} {...rowProps} />
        } else {
            i === 0 && (dataType = DataTypes.VENUE)
            return <VenueRow item={item} {...rowProps} />
        }
    })

    const header = headers[dataType]

    return (
        <table className="table w-full border-collapse rounded-lg bg-white shadow-md">
            {header}
            <tbody>{items.length ? rows : <tr>No results</tr>}</tbody>
        </table>
    )
}
