import { Popover, Flex, Text, Heading, Box } from '@radix-ui/themes'
import Image from 'next/image'
import { EventWithArtistVenue } from '~/types/data'
import { formatInTimeZone } from 'date-fns-tz'
import { normalizeUrl } from '~/utils/shared'
import Link from '~/components/Link'

export type PopoverProps = {
    event: EventWithArtistVenue
    children: React.ReactNode
}

/**
 * Popover component for displaying event details
 * @param event - EventWithArtistVenue
 * @param children - React.ReactNode
 * @returns JSX.Element
 */
export default function EventPopover({ event, children }: PopoverProps) {
    const eventImagePath = event.artist.photoPath ?? event.venue.photoPath ?? ''
    const eventDescription = event.description ?? event.artist.description
    const eventWebsite = normalizeUrl(
        event.artist.website ?? event.venue.website
    )

    return (
        <Popover.Root>
            <Popover.Trigger>{children}</Popover.Trigger>
            <Popover.Content
                avoidCollisions={true}
                size="1"
                align="center"
                className="max-w-sm"
            >
                <Flex direction="column" gap="3">
                    <Box>
                        <Heading>{event.name}</Heading>
                        <Heading size="2">{event.venue.name}</Heading>
                    </Box>
                    <Text>
                        {formatInTimeZone(
                            event.startDate,
                            'America/Toronto',
                            'h:mm a'
                        )}
                        {' - '}
                        {formatInTimeZone(
                            event.endDate,
                            'America/Toronto',
                            'h:mm a'
                        )}
                    </Text>
                    {eventImagePath ? (
                        <Flex position="relative" className="h-64 w-full">
                            <Image
                                src={eventImagePath}
                                alt="image of artist for event"
                                fill={true}
                                objectFit="cover"
                            />
                        </Flex>
                    ) : null}
                    {eventDescription && (
                        <Text size="1">{eventDescription}</Text>
                    )}
                    {eventWebsite && (
                        <Link href={eventWebsite}>
                            <Text>Learn more</Text>
                        </Link>
                    )}
                </Flex>
            </Popover.Content>
        </Popover.Root>
    )
}
