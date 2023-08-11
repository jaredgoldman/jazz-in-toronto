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
const headerClassName =
    'truncate border-b bg-black px-6 py-3 text-left text-sm font-semibold text-white max-w-xs'

const rowClassName =
    'max-w-xs truncate text-white-800 border px-4 py-2 text-left text-xs'

export const EventHeader = (): JSX.Element => {
    return (
        <tr>
            <th className={headerClassName}>Event Name</th>
            <th className={headerClassName}>Featured</th>
            <th className={headerClassName}>Venue</th>
            <th className={headerClassName}>Date</th>
            <th className={headerClassName}>Time</th>
            <th className={headerClassName}>Band</th>
            <th className={headerClassName}>Website</th>
            <th className={headerClassName}>Insta</th>
            <th className={headerClassName}>Cancelled</th>
            <th className={headerClassName}>Featured</th>
            <th className={headerClassName}></th>
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
            <td className={rowClassName}>{item.name}</td>
            <td className={rowClassName}>{item.featured ? 'Yes' : 'No'}</td>
            <td className={rowClassName}>{item.venue.name}</td>
            <td className={rowClassName}>{item.startDate.toDateString()}</td>
            <td className={rowClassName}>{`${getFormattedTime(
                item.startDate
            )} - ${getFormattedTime(item.endDate)}`}</td>
            <td className={rowClassName}>{item.band.name}</td>
            <td className={rowClassName}>{item.website ? item.website : ''}</td>
            <td className={rowClassName}>
                {item.instagramHandle ? item.instagramHandle : ''}
            </td>
            <td className={rowClassName}>{item.cancelled}</td>
            <td className={`text-center ${rowClassName}`}>
                <input
                    type="checkbox"
                    className="h-full"
                    checked={item.id === featured}
                    onChange={() => setFeatured(item.id, DataType.EVENT)}
                />
            </td>
            <td className={rowClassName}>
                <Button
                    size="sm"
                    onClick={() => handleModalForm(ModalForms.Event, item)}
                >
                    Edit
                </Button>
            </td>
        </tr>
    )
}

export const BandHeader = (): JSX.Element => {
    return (
        <tr>
            <th className={headerClassName}>Name</th>
            <th className={headerClassName}>Genre</th>
            <th className={headerClassName}>instagramHandle</th>
            <th className={headerClassName}>Website</th>
            <th className={headerClassName}>Active</th>
            <th className={headerClassName}>Featured</th>

            <th className={headerClassName}></th>
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
            <td className={rowClassName}>{item.name}</td>
            <td className={rowClassName}>{item.genre ? item.genre : ''}</td>
            <td className={rowClassName}>
                {item.instagramHandle ? item.instagramHandle : ''}
            </td>
            <td className={rowClassName}>{item.website ? item.website : ''}</td>
            <td className={rowClassName}>{item.active}</td>
            <td className={rowClassName}>
                <input
                    type="checkbox"
                    checked={item.id === featured}
                    onChange={() => setFeatured(item.id, DataType.BAND)}
                />
            </td>

            <td className={rowClassName}>
                <Button
                    size="sm"
                    onClick={() => handleModalForm(ModalForms.Band, item)}
                >
                    Edit
                </Button>
            </td>
        </tr>
    )
}

export const VenueHeader = (): JSX.Element => {
    return (
        <tr>
            <th className={headerClassName}>Name</th>
            <th className={headerClassName}>Address</th>
            <th className={headerClassName}>City</th>
            <th className={headerClassName}>Website</th>
            <th className={headerClassName}>instagramHandle</th>
            <th className={headerClassName}>Active</th>
            <th className={headerClassName}>Featured</th>
            <th className={headerClassName}></th>
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
            <td className={rowClassName}>{item.name}</td>
            <td className={rowClassName}>{item.address}</td>
            <td className={rowClassName}>{item.city}</td>
            <td className={rowClassName}>{item.website ? item.website : ''}</td>
            <td className={rowClassName}>
                {item.instagramHandle ? item.instagramHandle : ''}
            </td>
            <td className={rowClassName}>{item.active ? 'Yes' : 'No'}</td>
            <td className={rowClassName}>
                <input
                    type="checkbox"
                    checked={item.id === featured}
                    onChange={() => setFeatured(item.id, DataType.VENUE)}
                />
            </td>

            <td className={rowClassName}>
                <Button
                    size="sm"
                    onClick={() => handleModalForm(ModalForms.Venue, item)}
                >
                    Edit
                </Button>
            </td>
        </tr>
    )
}
