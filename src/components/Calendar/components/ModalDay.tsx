// Types
import { type DailyEventData } from '../types'
import { type EventWithBandVenue } from '~/types/data'
// Utils
import { getFormattedTime } from '~/utils/date'

interface Props {
    dailyEvents: DailyEventData
}

export default function ModalDay({ dailyEvents: { date, events } }: Props) {
    console.log('DAILY EVENTS', events)
    const readableDate = new Intl.DateTimeFormat('en-US', {
        dateStyle: 'full'
    }).format(date)

    const venueEvents = Object.entries(events).map(([venueName, events]) => {
        return (
            <>
                <tr className="m-2 w-full bg-black" key={venueName}>
                    <td className="text-lg">{venueName}</td>
                </tr>
                {events.map((event: EventWithBandVenue) => {
                    return (
                        <tr className="m-2" key={event.id}>
                            <td>
                                <span className="mr-6">
                                    {`${getFormattedTime(event.startDate)}`}
                                </span>
                                <span>{event.band.name}</span>
                            </td>
                        </tr>
                    )
                })}
            </>
        )
    })

    return (
        <div className="w-full p-2">
            <div className="mb-2 text-center text-lg">{`Events on ${readableDate}`}</div>
            <div className=" h-[60vh]  overflow-y-auto">
                <table className="w-full">
                    <tbody className="w-full">{venueEvents}</tbody>
                </table>
            </div>
        </div>
    )
}
