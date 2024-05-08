import { EventWithArtistVenue } from '~/types/data'
import { Flex, Heading, IconButton } from '@radix-ui/themes'
import format from 'date-fns/format'
import { Cross1Icon } from '@radix-ui/react-icons'

type Props = {
    venueName: string
    events: EventWithArtistVenue[]
    onClose: () => void
}

export function EventsMapOverlay({ venueName, events, onClose }: Props) {
    return (
        <Flex
            position="relative"
            top="0"
            left="0"
            height="100%"
            px="2"
            py="5"
            direction="column"
            className="z-50 w-1/3 border-r border-slate-300 bg-slate-100/70 text-black"
        >
            <IconButton
                className="absolute right-2 top-2"
                onClick={onClose}
                variant="ghost"
            >
                <Cross1Icon color="black" />
            </IconButton>
            <Heading mb="3">{`Today @ ${venueName}`}</Heading>
            <Flex direction="column">
                {events.map((event) => (
                    <Flex key={event.id}>{`${event.name} @ ${format(
                        event.startDate,
                        'h:mm a'
                    )}`}</Flex>
                ))}
            </Flex>
        </Flex>
    )
}
