import { Artist, EventWithVenue } from '~/types/data'
import Image from 'next/image'
import { Heading, Flex, Text, Card, Grid } from '@radix-ui/themes'
import { genreLabels } from '~/utils/labels'
import { formatInTimeZone } from 'date-fns-tz'
import { simplifyURL } from '~/utils'
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
    return (
        <Flex direction="column" gap="5" className="max-w-5xl">
            <Heading size="9">{artist.name}</Heading>
            {artist.photoPath && artist.photoName ? (
                <Image
                    src={artist.photoPath}
                    alt={artist.photoName}
                    height={1000}
                    width={1000}
                />
            ) : null}
            {artist.genre ? (
                <Flex direction="column">
                    <Heading size="6">Genre</Heading>
                    <Text>{genreLabels[artist.genre]}</Text>
                </Flex>
            ) : null}
            {artist.description ? (
                <Flex direction="column" className="">
                    <Heading size="6">About</Heading>
                    <Text>{artist.description}</Text>
                </Flex>
            ) : null}
            <Flex direction="column">
                <Heading size="6">Contact</Heading>
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
                <Flex direction="column" gap="3">
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
                                            {formatInTimeZone(
                                                event.startDate,
                                                'America/Toronto',
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
