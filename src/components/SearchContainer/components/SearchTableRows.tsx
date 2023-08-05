// Components
import { ModalForms } from '~/components/Modal/types'
import Button from '~/components/Button'
// Types
import { type EventWithBandVenue, type Band, type Venue } from '~/types/data'
// Utils
import { getFormattedTime } from '~/utils/date'
import { DataType } from '~/types/enums'

interface RowProps<T> {
    item: T
    handleModalForm: (formType: ModalForms, item: T) => void
    featured?: string
    setFeatured: (id: string, type: DataType) => void
}

export const EventHeader = (): JSX.Element => {
    return (
        <tr>
            <th className="border-b bg-gray-100 px-6 py-3 text-left font-semibold text-gray-700">
                Event Name
            </th>
            <th className="border-b bg-gray-100 px-6 py-3 text-left font-semibold text-gray-700">
                Featured
            </th>
            <th className="border-b bg-gray-100 px-6 py-3 text-left font-semibold text-gray-700">
                Venue
            </th>
            <th className="border-b bg-gray-100 px-6 py-3 text-left font-semibold text-gray-700">
                Date
            </th>
            <th className="border-b bg-gray-100 px-6 py-3 text-left font-semibold text-gray-700">
                Time
            </th>
            <th className="border-b bg-gray-100 px-6 py-3 text-left font-semibold text-gray-700">
                Band
            </th>
            <th className="border-b bg-gray-100 px-6 py-3 text-left font-semibold text-gray-700">
                Website
            </th>
            <th className="border-b bg-gray-100 px-6 py-3 text-left font-semibold text-gray-700">
                Insta
            </th>
            <th className="border-b bg-gray-100 px-6 py-3 text-left font-semibold text-gray-700">
                Cancelled
            </th>
            <th className="border-b bg-gray-100 px-6 py-3 text-left font-semibold text-gray-700">
                Featured
            </th>
            <th className="border-b bg-gray-100 px-6 py-3 text-left font-semibold text-gray-700"></th>
        </tr>
    )
}

export const EventRow = ({
    item,
    handleModalForm,
    featured,
    setFeatured
}: RowProps<EventWithBandVenue>): JSX.Element => {
    return (
        <tr>
            <td className="border px-4 py-2 text-left text-xs text-gray-800">
                {item.name}
            </td>
            <td className="border px-4 py-2 text-left text-xs text-gray-800">
                {item.featured ? 'Yes' : 'No'}
            </td>
            <td className="border px-4 py-2 text-left text-xs text-gray-800">
                {item.venue.name}
            </td>
            <td className="border px-4 py-2 text-left text-xs text-gray-800">
                {item.startDate.toDateString()}
            </td>
            <td className="border px-4 py-2 text-left text-xs text-gray-800">{`${getFormattedTime(
                item.startDate
            )} - ${getFormattedTime(item.endDate)}`}</td>
            <td className="border px-4 py-2 text-left text-xs text-gray-800">
                {item.band.name}
            </td>
            <td className="border px-4 py-2 text-left text-xs text-gray-800">
                {item.website ? item.website : ''}
            </td>
            <td className="border px-4 py-2 text-left text-xs text-gray-800">
                {item.instagramHandle ? item.instagramHandle : ''}
            </td>
            <td className="border px-4 py-2 text-left text-xs text-gray-800">
                {item.cancelled}
            </td>
            <td className="border px-4 py-2 text-left text-xs text-gray-800">
                <input
                    type="checkbox"
                    checked={item.id === featured}
                    onChange={() => setFeatured(item.id, DataType.EVENT)}
                />
            </td>
            <td className="border px-4 py-2 text-left text-xs text-gray-800">
                <Button onClick={() => handleModalForm(ModalForms.Event, item)}>
                    Edit
                </Button>
            </td>
        </tr>
    )
}

export const BandHeader = (): JSX.Element => {
    return (
        <tr>
            <th className="border-b bg-gray-100 px-6 py-3 text-left font-semibold text-gray-700">
                Name
            </th>
            <th className="border-b bg-gray-100 px-6 py-3 text-left font-semibold text-gray-700">
                Genre
            </th>
            <th className="border-b bg-gray-100 px-6 py-3 text-left font-semibold text-gray-700">
                instagramHandle
            </th>
            <th className="border-b bg-gray-100 px-6 py-3 text-left font-semibold text-gray-700">
                Website
            </th>
            <th className="border-b bg-gray-100 px-6 py-3 text-left font-semibold text-gray-700">
                Active
            </th>
            <th className="border-b bg-gray-100 px-6 py-3 text-left font-semibold text-gray-700">
                Featured
            </th>

            <th className="border-b bg-gray-100 px-6 py-3 text-left font-semibold text-gray-700"></th>
        </tr>
    )
}

export const BandRow = ({
    item,
    handleModalForm,
    featured,
    setFeatured
}: RowProps<Band>) => {
    return (
        <tr>
            <td className="border px-4 py-2 text-left text-xs text-gray-800">
                {item.name}
            </td>
            <td className="border px-4 py-2 text-left text-xs text-gray-800">
                {item.genre ? item.genre : ''}
            </td>
            <td className="border px-4 py-2 text-left text-xs text-gray-800">
                {item.instagramHandle ? item.instagramHandle : ''}
            </td>
            <td className="border px-4 py-2 text-left text-xs text-gray-800">
                {item.website ? item.website : ''}
            </td>
            <td className="border px-4 py-2 text-left text-xs text-gray-800">
                {item.active}
            </td>
            <td className="border px-4 py-2 text-left text-xs text-gray-800">
                <input
                    type="checkbox"
                    checked={item.id === featured}
                    onChange={() => setFeatured(item.id, DataType.BAND)}
                />
            </td>

            <td className="border px-4 py-2 text-left text-xs text-gray-800">
                <Button onClick={() => handleModalForm(ModalForms.Band, item)}>
                    Edit
                </Button>
            </td>
        </tr>
    )
}

export const VenueHeader = (): JSX.Element => {
    return (
        <tr>
            <th className="border-b bg-gray-100 px-6 py-3 text-left font-semibold text-gray-700">
                Name
            </th>
            <th className="border-b bg-gray-100 px-6 py-3 text-left font-semibold text-gray-700">
                Address
            </th>
            <th className="border-b bg-gray-100 px-6 py-3 text-left font-semibold text-gray-700">
                City
            </th>
            <th className="border-b bg-gray-100 px-6 py-3 text-left font-semibold text-gray-700">
                Website
            </th>
            <th className="border-b bg-gray-100 px-6 py-3 text-left font-semibold text-gray-700">
                instagramHandle
            </th>
            <th className="border-b bg-gray-100 px-6 py-3 text-left font-semibold text-gray-700">
                Active
            </th>
            <th className="border-b bg-gray-100 px-6 py-3 text-left font-semibold text-gray-700">
                Featured
            </th>
            <th className="border-b bg-gray-100 px-6 py-3 text-left font-semibold text-gray-700"></th>
        </tr>
    )
}

export const VenueRow = ({
    item,
    handleModalForm,
    featured,
    setFeatured
}: RowProps<Venue>) => {
    return (
        <tr>
            <td className="border px-4 py-2 text-left text-xs text-gray-800">
                {item.name}
            </td>
            <td className="border px-4 py-2 text-left text-xs text-gray-800">
                {item.address}
            </td>
            <td className="border px-4 py-2 text-left text-xs text-gray-800">
                {item.city}
            </td>
            <td className="border px-4 py-2 text-left text-xs text-gray-800">
                {item.website ? item.website : ''}
            </td>
            <td className="border px-4 py-2 text-left text-xs text-gray-800">
                {item.instagramHandle ? item.instagramHandle : ''}
            </td>
            <td className="border px-4 py-2 text-left text-xs text-gray-800">
                {item.active ? 'Yes' : 'No'}
            </td>
            <td className="border px-4 py-2 text-left text-xs text-gray-800">
                <input
                    type="checkbox"
                    checked={item.id === featured}
                    onChange={() => setFeatured(item.id, DataType.VENUE)}
                />
            </td>

            <td className="border px-4 py-2 text-left text-xs text-gray-800">
                <Button onClick={() => handleModalForm(ModalForms.Venue, item)}>
                    Edit
                </Button>
            </td>
        </tr>
    )
}
