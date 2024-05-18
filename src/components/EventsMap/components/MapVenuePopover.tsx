import { useCallback } from 'react'
import { EventWithArtistVenue, Venue } from '~/types/data'
import {
    Popover,
    Flex,
    Box,
    Heading,
    Text,
    Button,
    Link
} from '@radix-ui/themes'
import { formatInTimeZone } from 'date-fns-tz'
import { ArrowRightIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/router'

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
    const router = useRouter()

    const handleViewArtist = useCallback(
        async (artistId: string) =>
            await router.push(`/artist/${artistId}`, undefined, {
                shallow: true
            }),
        [router]
    )

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
                                <Text
                                    className="cursor-pointer"
                                    onClick={() =>
                                        handleViewArtist(event.artist.id)
                                    }
                                    key={event.id}
                                >
                                    {event.name}
                                </Text>
                            </Flex>
                        ))}
                    </Box>
                </Flex>
            </Popover.Content>
        </Popover.Root>
    )
}
