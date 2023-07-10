import { isBand, isEvent } from '../utils'
import { EventWithBandVenue, Band, Venue } from '~/types/data'
import {
    EventHeader,
    EventRow,
    BandHeader,
    BandRow,
    VenueHeader,
    VenueRow
} from './SearchTableRows'

interface Props {
    items: Band[] | EventWithBandVenue[] | Venue[]
}

export default function SearchTable({ items }: Props): JSX.Element {
    let header
    let rows
    if (isEvent(items[0])) {
        header = <EventHeader />
        rows = (items as EventWithBandVenue[]).map((item) => {
            return <EventRow item={item} />
        })
    } else if (isBand(items[0])) {
        header = <BandHeader />
        rows = (items as Band[]).map((item) => {
            return <BandRow item={item} />
        })
    } else {
        header = <VenueHeader />
        rows = (items as Venue[]).map((item) => {
            return <VenueRow item={item} />
        })
    }

    return (
        <table className="table w-full border-collapse rounded-lg bg-white shadow-md">
            {header}
            <tbody>{rows}</tbody>
        </table>
    )
}
