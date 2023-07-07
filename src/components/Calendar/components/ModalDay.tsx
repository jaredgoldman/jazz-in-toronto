import { DailyEventData, EventWithBandVenue } from "../types"
interface Props {
    dailyEvents: DailyEventData
}

export default function ModalDay({ dailyEvents: { date, events } }: Props) {
    const readableDate = new Intl.DateTimeFormat("en-US", {
        dateStyle: "full"
    }).format(date)

    const eventCards = events.length ? (
        events.map((event: EventWithBandVenue) => {
            return (
                <div className="m-2" key={event.name}>
                    <div>Event name: {event.name}</div>
                    <div>Band name: {event.band.name}</div>
                    <div>Venue name: {event.venue.name}</div>
                    <div>
                        Start time: {event.startDate.toLocaleDateString()}
                    </div>
                    <div>End time: {event.startDate.toLocaleDateString()}</div>
                </div>
            )
        })
    ) : (
        <div>No events today</div>
    )
    return (
        <div>
            <div>{readableDate}</div>
            <div>{eventCards}</div>
        </div>
    )
}
