import { EventWithBandVenue } from '~/types/data'

interface Props {
    item: EventWithBandVenue
}

export default function EventRow({ item }: Props) {
    return (
        <tr>
            <td>{item.name}</td>
            <td>{item.startDate.toTimeString()}</td>
            <td>{item.endDate.toTimeString()}</td>
            <td>{item.venue.name}</td>
            <td>{item.venue.city}</td>
            <td>{item.band.name}</td>
            {item.website && <td>{item.website}</td>}
            {item.instagramHandle && <td>{item.instagramHandle}</td>}
        </tr>
    )
}
