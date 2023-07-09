import { Venue } from '@prisma/client'

interface Props {
    item: Venue
}

export default function VenueRow({ item }: Props) {
    return (
        <tr>
            <td>{item.name}</td>
            <td>{item.address}</td>
            <td>{item.city}</td>
            {item.website && <td>{item.website}</td>}
            {item.instagramHandle && <td>{item.instagramHandle}</td>}
        </tr>
    )
}
