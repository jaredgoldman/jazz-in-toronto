import { Popover, Flex, Button, Text, Heading } from '@radix-ui/themes'
import { CircleIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import { EventWithArtistVenue } from '~/types/data'
import { formatInTimeZone } from 'date-fns-tz'

export type PopoverProps = {
    event: EventWithArtistVenue
    children: React.ReactNode
}

export default function EventPopover({ event, children }: PopoverProps) {
    const eventImagePath = event.artist.photoPath ?? event.venue.photoPath ?? ''
    const eventDescription = event.description ?? event.artist.description
    return (
        <Popover.Root>
            <Popover.Trigger>
              {children}
            </Popover.Trigger>
            <Popover.Content>
                <Flex direction="column">
                    <Heading>{event.name}</Heading>
                    {eventImagePath ? (
                        <Image
                            src={eventImagePath}
                            alt="image of artist for event"
                        />
                    ) : null}
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
                    {eventDescription && <Text>{eventDescription}</Text>}
                </Flex>
            </Popover.Content>
        </Popover.Root>
    )
}
