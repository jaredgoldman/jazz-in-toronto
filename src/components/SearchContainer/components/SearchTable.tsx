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
import { DataType } from '~/types/enums'
import { type Item } from '~/types/data'
import { type ModalContextType } from '~/components/Modal/types'
// Utils
import { isBand, isEvent } from '~/utils/typeguards'
// Context
import { ModalContext } from '~/components/Modal/context/ModalContext'

interface Props {
    items: Array<Item>
    headerType: DataType
}

const headers = {
    [DataType.EVENT]: <EventHeader />,
    [DataType.BAND]: <BandHeader />,
    [DataType.VENUE]: <VenueHeader />,
    [DataType.ADMIN]: null
}

export default function SearchTable({ items, headerType }: Props): JSX.Element {
    const { handleModalForm } = useContext(ModalContext) as ModalContextType

    const rowProps = {
        handleModalForm
    }

    // We can assume items will be all of one type
    // however let's just make TS happy by typeguarding all items
    const rows = items.map((item) => {
        if (isEvent(item)) {
            return <EventRow item={item} key={item.id} {...rowProps} />
        } else if (isBand(item)) {
            return <BandRow item={item} key={item.id} {...rowProps} />
        } else {
            return <VenueRow item={item} key={item.id} {...rowProps} />
        }
    })

    const header = headers[headerType]

    return (
        <table className="table w-full border-collapse rounded-lg bg-white shadow-md">
            {header}
            <tbody>{items.length ? rows : <tr>No results</tr>}</tbody>
        </table>
    )
}
