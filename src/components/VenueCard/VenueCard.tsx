// Types
import { type Venue } from '~/types/data'

interface Props {
    venue: Venue
}

export default function VenueCard({ venue }: Props): JSX.Element {
    return (
        <div className="m-2 border-2 border-black p-1">
            <div>{venue.name}</div>
            <div>Address: {venue.address}</div>
            <div>Website: {venue.website}</div>
            <div>Instagram: {venue.instagramHandle}</div>
        </div>
    )
}
