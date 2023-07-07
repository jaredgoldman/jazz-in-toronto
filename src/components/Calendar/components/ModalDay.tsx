import { EventWithBand } from "../types"

interface Props {
    dayOfMonth: number
    dailyEvents: EventWithBand[] | []
}

export default function ModalDay({ dayOfMonth, dailyEvents }: Props) {
    const eventCards = dailyEvents.map((event) => {
        return (
            <div className="m-2" key={event.name}>
                <div>Event name: {event.name}</div>
                <div>Band name: {event.band.name}</div>
                <div>Start time: {event.startDate.toLocaleDateString()}</div>
                <div>End time: {event.startDate.toLocaleDateString()}</div>
            </div>
        )
    })
    return (
        <div>
            <div>{dayOfMonth}</div>
            <div>{eventCards}</div>
        </div>
    )
}
