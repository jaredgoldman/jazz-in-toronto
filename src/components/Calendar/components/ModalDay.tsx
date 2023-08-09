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
                <tr className="m-2 bg-black w-full" key={venueName}>
                    <td>{venueName}</td>
                </tr>
                {events.map((event: EventWithBandVenue) => {
                    return (
                        <tr className="m-2" key={event.id}>
                            <td>
                                {`${event.band.name}: ${getFormattedTime(
                                    event.startDate
                                )} - ${getFormattedTime(event.endDate)}`}
                            </td>
                        </tr>
                    )
                })}
            </>
        )
    })

    return (
        <div className="mb-2">
            <div className="mb-2 text-center">{`Events on ${readableDate}`}</div>
            <div className="h-[60vh] overflow-y-auto border-black border-2 mb-7">
                <table className='w-full'>
                    <tbody className="w-full">{venueEvents}</tbody>
                </table>
            </div>
        </div>
    )
}
