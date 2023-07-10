import { isBand, isEvent } from '../utils'
import { Item } from '../types'
import { EventWithBandVenue, Band, Venue } from '~/types/data'
import { getFormattedTime } from '~/utils/date'

interface Props {
    items: Item[]
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
        <table className="table border-collapse w-full bg-white rounded-lg shadow-md">
            {header}
            <tbody>{rows}</tbody>
        </table>
    )
}

const EventHeader = (): JSX.Element => {
    return (
        <thead>
            <tr>
                <th className="bg-gray-100 border-b px-6 py-3 text-left text-gray-700 font-semibold">Event Name</th>
                <th className="bg-gray-100 border-b px-6 py-3 text-left text-gray-700 font-semibold">Featured</th>
                <th className="bg-gray-100 border-b px-6 py-3 text-left text-gray-700 font-semibold">Venue</th>
                <th className="bg-gray-100 border-b px-6 py-3 text-left text-gray-700 font-semibold">Date</th>
                <th className="bg-gray-100 border-b px-6 py-3 text-left text-gray-700 font-semibold">Time</th>
                <th className="bg-gray-100 border-b px-6 py-3 text-left text-gray-700 font-semibold">Band</th>
                <th className="bg-gray-100 border-b px-6 py-3 text-left text-gray-700 font-semibold">Website</th>
                <th className="bg-gray-100 border-b px-6 py-3 text-left text-gray-700 font-semibold">Insta</th>
                <th className="bg-gray-100 border-b px-6 py-3 text-left text-gray-700 font-semibold">Cancelled</th>
            </tr>
        </thead>
    )
}

const EventRow = ({ item }: { item: EventWithBandVenue }): JSX.Element => {
    return (
        <tr>
            <td className="border px-4 py-2 text-left text-gray-800 text-xs">{item.name}</td>
            <td className="border px-4 py-2 text-left text-gray-800 text-xs">{item.featured ? "Yes" : "No"}</td>
            <td className="border px-4 py-2 text-left text-gray-800 text-xs">{item.venue.name}</td>
            <td className="border px-4 py-2 text-left text-gray-800 text-xs">{item.startDate.toDateString()}</td>
            <td className="border px-4 py-2 text-left text-gray-800 text-xs">{`${getFormattedTime(
                item.startDate
            )} - ${getFormattedTime(item.endDate)}`}</td>
            <td className="border px-4 py-2 text-left text-gray-800 text-xs">{item.band.name}</td>
            <td className="border px-4 py-2 text-left text-gray-800 text-xs">
                {item.website ? item.website : ''}
            </td>
            <td className="border px-4 py-2 text-left text-gray-800 text-xs">
                {item.instagramHandle ? item.instagramHandle : ''}
            </td>
            <td className="border px-4 py-2 text-left text-gray-800 text-xs">{item.cancelled}</td>
        </tr>
    )
}

const BandHeader = (): JSX.Element => {
    return (
        <thead>
            <tr>
                <td className="m-2 w-28 text-center">Name</td>
                <td className="m-2 w-28 text-center">featured</td>
                <td className="m-2 w-28 text-center">Genre</td>
                <td className="m-2 w-28 text-center">instagramHandle</td>
                <td className="m-2 w-28 text-center">Website</td>
                <td className="m-2 w-28 text-center">Active</td>
            </tr>
        </thead>
    )
}

const BandRow = ({ item }: { item: Band }) => {
    return (
        <tr>
            <td className="m-2 w-28 text-center">{item.name}</td>
            <td className="m-2 w-28 text-center">{item.featured}</td>
            <td className="m-2 w-28 text-center">
                {item.genre ? item.genre : ''}
            </td>
            <td className="m-2 w-28 text-center">
                {item.instagramHandle ? item.instagramHandle : ''}
            </td>
            <td className="m-2 w-28 text-center">
                {item.website ? item.website : ''}
            </td>
            <td className="m-2 w-28 text-center">{item.active}</td>
        </tr>
    )
}

const VenueHeader = (): JSX.Element => {
    return (
        <thead>
            <tr>
                <td className="m-2 w-28 text-center">Name</td>
                <td className="m-2 w-28 text-center">Featured</td>
                <td className="m-2 w-28 text-center">Address</td>
                <td className="m-2 w-28 text-center">City</td>
                <td className="m-2 w-28 text-center">Website</td>
                <td className="m-2 w-28 text-center">instagramHandle</td>
                <td className="m-2 w-28 text-center">Active</td>
            </tr>
        </thead>
    )
}

const VenueRow = ({ item }: { item: Venue }) => {
    return (
        <tr>
            <td className="m-2 w-28 text-center">{item.name}</td>
            <td className="m-2 w-28 text-center">{item.featured}</td>
            <td className="m-2 w-28 text-center">
                {item.address ? item.address : ''}
            </td>
            <td className="m-2 w-28 text-center">
                {item.instagramHandle ? item.instagramHandle : ''}
            </td>
            <td className="m-2 w-28 text-center">
                {item.website ? item.website : ''}
            </td>
            <td className="m-2 w-28 text-center">{item.active}</td>
        </tr>
    )
}
