// Types
import { type DailyEventData } from '../types'
import { type EventWithBandVenue } from '~/types/data'

interface Props {
    dailyEvents: DailyEventData
}

export default function ModalDay({ dailyEvents: { date, events } }: Props) {
    const readableDate = new Intl.DateTimeFormat('en-US', {
        dateStyle: 'full'
    }).format(date)

    const venueEvents = Object.entries(events).map(([venueName, events]) => {
        return (
            <div className="m-2" key={venueName}>
                <h1>Venue name: {venueName}</h1>
                <div>
                    {events.map((event: EventWithBandVenue) => {
                        return (
                            <div className="m-2" key={event.id}>
                                <div>Event name: {event.name}</div>
                                <div>Band name: {event.band.name}</div>
                                <div>Venue name: {event.venue.name}</div>
                                <div>
                                    Start time:{' '}
                                    {event.startDate.toLocaleDateString()}
                                </div>
                                <div>
                                    End time:{' '}
                                    {event.startDate.toLocaleDateString()}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    })

    return (
        <div>
            <div>{readableDate}</div>
            <div>{venueEvents}</div>
        </div>
    )
}
