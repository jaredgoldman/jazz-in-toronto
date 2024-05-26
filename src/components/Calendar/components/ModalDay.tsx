import { Table, Heading, Text, Flex } from '@radix-ui/themes'
import { DailyEventData } from '../types'
import { EventWithArtistVenue } from '~/types/data'
import { getFormattedTime } from '~/utils/date'
import Link from '~/components/Link'

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
                    <Table.Cell className="text-lg">
                        <Link href={`/venue/${events[0]?.venueId ?? ""}`}>
                            <Heading className="text-white hover:underline" size="5">
                                {venueName}
                            </Heading>
                        </Link>
                    </Table.Cell>
                </Table.Row>
                {events.map((event: EventWithArtistVenue) => {
                    return (
                        <Table.Row className="m-2" key={event.id}>
                            <Table.Cell>
                                <span className="mr-6">
                                    {`${getFormattedTime(event.startDate)}`}
                                </span>
                                <Link href={`/artist/${event.artist.id}`}>
                                    {event.name}
                                </Link>
                            </Table.Cell>
                        </Table.Row>
                    )
                })}
            </>
        )
    })

    return (
        <Flex direction="column" key={readableDate} gap="4">
            <Heading align="center">{`Events on ${readableDate}`}</Heading>
            <div className="h-[60vh] overflow-y-auto">
                <Table.Root>
                    <Table.Body>
                        {venueEvents.length ? (
                            venueEvents
                        ) : (
                            <Flex justify="center" align="center" mt="5">
                                <Text>No events on this date</Text>
                            </Flex>
                        )}
                    </Table.Body>
                </Table.Root>
            </div>
        </Flex>
    )
}
