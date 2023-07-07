import { Venue } from "@prisma/client"

interface Props {
    venue: Venue
}

export default function VenueCard({ venue }: Props): JSX.Element {
    return (
        <div className="border-2 border-black m-2 p-1">
            <div>{venue.name}</div>
            <div>Address: {venue.address}</div>
            <div>Website: {venue.website}</div>
            <div>Instagram: {venue.instagramHandle}</div>
        </div>
    )
}
