import { Artist, EventWithVenue } from '~/types/data'
import { Heading, Flex, Text, Card, Grid } from '@radix-ui/themes'
import Image from 'next/image'
import { genreLabels } from '~/utils/labels'
import { formatTime, simplifyURL } from '~/utils'
import { LaptopIcon, InstagramLogoIcon } from '@radix-ui/react-icons'
import Link from '../Link'

/**
 * @param artist - Artist
 * @param events - EventWithVenue[]
 * @returns JSX.Element
 */
type Props = {
    artist: Artist
    events: EventWithVenue[]
}

/**
 * ViewArtist component
 * @param {Props}
 * @returns JSX.Element
 */
export default function ViewArtist({ artist, events }: Props) {
    const hasContact = Boolean(artist.instagramHandle || artist.website)
    return (
        <Flex
            direction="column"
            gap="5"
            className="min-w-6xl max-w-6xl"
            grow="1"
        >
            <Heading size="9">{artist.name}</Heading>
            {artist.photoPath && artist.photoName ? (
                <Image
                    src={artist.photoPath}
                    alt={artist.photoName}
                    height={1500}
                    width={1500}
                />
            ) : null}
            {artist.genre ? (
                <Flex direction="column">
                    <Heading size="6">Genre</Heading>
                    <Text>{genreLabels[artist.genre]}</Text>
                </Flex>
            ) : null}
            {artist.description ? (
                <Flex direction="column" gap="3" className="max-w-5xl">
                    {' '}
                    <Heading size="6">About</Heading>
                    <Text>{artist.description}</Text>
                </Flex>
            ) : null}
            <Flex direction="column" gap="2">
                {hasContact && <Heading size="6">Contact</Heading>}
                {artist.website ? (
                    <Flex gap="2" align="center">
                        <LaptopIcon width="23" height="22" />
                        <Link size="5" href={artist.website}>
                            {simplifyURL(artist.website)}
                        </Link>
                    </Flex>
                ) : null}
                {artist.instagramHandle ? (
                    <Flex gap="2" align="center">
                        <InstagramLogoIcon width="23" height="22" />
                        <Link
                            size="5"
                            href={`https://instagram.com/${artist.instagramHandle}`}
                        >
                            {artist.instagramHandle}
                        </Link>
                    </Flex>
                ) : null}
            </Flex>
            {events.length > 0 ? (
                <Flex direction="column" gap="4">
                    <Heading size="6">Upcoming Events</Heading>
                    <Flex direction="column" gap="4">
                        <Grid
                            gap="7"
                            columns={{ initial: '1', md: '3' }}
                            rows={{ initial: '3', md: '1' }}
                            align="center"
                        >
                            {events.map((event) => (
                                <Card key={event.id}>
                                    <Flex direction="column" gap="2">
                                        <Heading size="5">{event.name}</Heading>
                                        <Text>
                                            {formatTime(
                                                event.startDate,
<<<<<<< HEAD
                                                'America/New_York',
=======
>>>>>>> 861fb60 (feat: add venue/event pages)
                                                'h:mm a'
                                            )}
                                        </Text>
                                        <Text>{event.venue.name}</Text>
                                    </Flex>
                                </Card>
                            ))}
                        </Grid>
                    </Flex>
                </Flex>
            ) : null}
        </Flex>
    )
}
