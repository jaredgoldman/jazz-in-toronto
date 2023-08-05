import { type Venue } from '@prisma/client'
import Image from 'next/image'
interface Props {
    venue: Venue
}

export default function FeaturedVenue({ venue }: Props) {
    return (
        <div>
            <h1>{venue.name}</h1>
            {venue.photoPath && (
                <Image
                    src={venue.photoPath}
                    height={200}
                    width={200}
                    alt={venue.name}
                />
            )}
        </div>
    )
}
