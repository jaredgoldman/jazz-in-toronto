import { EventWithArtistVenue } from '~/types/data'
import Image from 'next/image'
import { Heading, Flex, Text } from '@radix-ui/themes'
import { simplifyURL, genreLabels, formatTime } from '~/utils'
import { LaptopIcon, InstagramLogoIcon } from '@radix-ui/react-icons'
import Link from '../Link'

/**
 * @param {EventWithArtistVenue} event
 * @returns JSX.Element
 */
type Props = {
    event: EventWithArtistVenue
}

/**
 * ViewArtist component
 * @param {Props}
 * @returns JSX.Element
 */
export default function ViewEvent({ event }: Props) {
    const eventInstagram = event.instagramHandle || event.artist.instagramHandle
    const eventWebsite = event.website || event.artist.website
    const hasContact = Boolean(eventWebsite || eventInstagram)
    const eventPhotoPath = event.artist.photoPath || event.venue.photoPath
    const eventPhotoName = event.artist.photoName || event.venue.photoName || ''
    const eventDescription = event.description || event.artist.description

    return (
        <Flex
            direction="column"
            gap="5"
            className="min-w-6xl max-w-6xl"
            grow="1"
        >
            <Heading size="9">{event.name}</Heading>
            <Heading size="7">
                {formatTime(event.startDate)} - {formatTime(event.endDate)}
            </Heading>
            <Heading size="7">
                <Link href={`/event/${event.venue.id}`}>
                    {event.venue.name}
                </Link>
            </Heading>
            {eventPhotoPath ? (
                <Image
                    src={eventPhotoPath}
                    alt={eventPhotoName}
                    height={1500}
                    width={1500}
                />
            ) : null}
            {event.artist.genre ? (
                <Flex direction="column">
                    <Heading size="6">Genre</Heading>
                    <Text>{genreLabels[event.artist.genre]}</Text>
                </Flex>
            ) : null}
            {eventDescription ? (
                <Flex direction="column" gap="3" className="max-w-5xl">
                    {' '}
                    <Heading size="6">About</Heading>
                    <Text>{eventDescription}</Text>
                </Flex>
            ) : null}
            <Flex direction="column" gap="2">
                {hasContact && <Heading size="6">Contact</Heading>}
                {eventWebsite ? (
                    <Flex gap="2" align="center">
                        <LaptopIcon width="23" height="22" />
                        <Link size="5" href={eventWebsite}>
                            {simplifyURL(eventWebsite)}
                        </Link>
                    </Flex>
                ) : null}
                {eventInstagram ? (
                    <Flex gap="2" align="center">
                        <InstagramLogoIcon width="23" height="22" />
                        <Link
                            size="5"
                            href={`https://instagram.com/${eventInstagram}`}
                        >
                            {eventInstagram}
                        </Link>
                    </Flex>
                ) : null}
            </Flex>
        </Flex>
    )
}
