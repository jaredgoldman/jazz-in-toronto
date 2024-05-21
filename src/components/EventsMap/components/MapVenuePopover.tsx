import { EventWithArtistVenue, Venue } from '~/types/data'
import { Popover, Flex, Box, Heading, Text } from '@radix-ui/themes'
import { formatInTimeZone } from 'date-fns-tz'
import { ArrowRightIcon } from '@radix-ui/react-icons'
import Link from '~/components/Link'

/**
 * @param events - EventWithArtistVenue[]
 * @param venue - Venue
 * @param children - React.ReactNode
 * @param visible - boolean
 * @returns JSX.Element
 */
type Props = {
    events: EventWithArtistVenue[]
    venue: Venue
    children: React.ReactNode
    visible: boolean
    onFocusOutside: () => void
}

/**
 * Popover component for displaying venue events
 * @param {Props}
 */
export function MapVenuePopover({
    events,
    venue,
    children,
    visible,
    onFocusOutside
}: Props) {
    return (
        <Popover.Root open={visible}>
            <Popover.Trigger>
                <Flex>{children}</Flex>
            </Popover.Trigger>
            <Popover.Content size="1" onFocusOutside={onFocusOutside}>
                <Flex
                    direction="column"
                    gap="2"
                    pr={{ xs: '0', sm: '2' }}
                    className="xs: max-w-[72vw]"
                >
                    <Heading>{venue.name}</Heading>
                    <Box>
                        {events.map((event) => (
                            <Flex gap="2" align="center" key={event.id}>
                                <Text>
                                    {formatInTimeZone(
                                        event.startDate,
                                        'America/Toronto',
                                        'h:mm a'
                                    )}
                                </Text>
                                <ArrowRightIcon />
                                <Link href={`/artist/${event.artist.id}`}>
                                    {event.name}
                                </Link>
                            </Flex>
                        ))}
                    </Box>
                </Flex>
            </Popover.Content>
        </Popover.Root>
    )
}
