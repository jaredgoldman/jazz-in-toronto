import { EventWithBandVenue } from '~/types/data'
import Image from 'next/image'

interface Props {
    event: EventWithBandVenue
}

export default function FeaturedEvent({ event }: Props) {
    return (
        <div>
            <h1>{event.name}</h1>
            <p>{`Venue: ${event.venue.name}`}</p>
            {event.name !== event.band.name && (
                <p>{`Band: ${event.band.name}`}</p>
            )}
            {event.band.photoPath && (
                <Image
                    src={event.band.photoPath}
                    height={200}
                    width={200}
                    alt="band photo"
                />
            )}
        </div>
    )
}
