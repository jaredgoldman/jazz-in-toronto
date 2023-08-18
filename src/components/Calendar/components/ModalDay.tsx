import { Table, Heading, Box } from '@radix-ui/themes'
// Types
import { type DailyEventData } from '../types'
import { type EventWithArtistVenue } from '~/types/data'
// Utils
import { getFormattedTime } from '~/utils/date'

interface Props {
    dailyEvents: DailyEventData
}

export default function ModalDay({ dailyEvents: { date, events } }: Props) {
    const readableDate = new Intl.DateTimeFormat('en-US', {
        dateStyle: 'full'
    }).format(date)

    const venueEvents = Object.entries(events).map(([venueName, events]) => {
        return (
            <>
                <Table.Row key={venueName}>
                    <Table.Cell className="text-lg">{venueName}</Table.Cell>
                </Table.Row>
                {events.map((event: EventWithArtistVenue) => {
                    return (
                        <Table.Row className="m-2" key={event.id}>
                            <Table.Cell>
                                <span className="mr-6">
                                    {`${getFormattedTime(event.startDate)}`}
                                </span>
                                <span>{event.artist.name}</span>
                            </Table.Cell>
                        </Table.Row>
                    )
                })}
            </>
        )
    })

    return (
        <Box key={readableDate}>
            <Heading align="center">{`Events on ${readableDate}`}</Heading>
            <div className="h-[60vh] overflow-y-auto">
                <Table.Root>
                    <Table.Body>{venueEvents}</Table.Body>
                </Table.Root>
            </div>
        </Box>
    )
}
