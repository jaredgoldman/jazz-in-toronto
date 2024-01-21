import { EventWithArtistVenue } from '~/types/data'
import { Flex, Heading } from '@radix-ui/themes'
import format from 'date-fns/format'

type Props = {
    venueName: string
    events: EventWithArtistVenue[]
}

export function EventsMapModal({ venueName, events }: Props) {
    return (
        <Flex
            position="relative"
            top="0"
            left="0"
            height="100%"
            p="2"
            direction="column"
            className="z-50 w-1/3 border-r border-slate-300 bg-slate-100/70 text-black"
        >
            <Heading mb="3">{`Today @ ${venueName}`}</Heading>
            <Flex direction="column">
                {events.map((event) => (
                    <Flex key={event.id}>{`${event.artist.name} @ ${format(
                        event.startDate,
                        'h:mm a'
                    )}`}</Flex>
                ))}
            </Flex>
        </Flex>
    )
}
