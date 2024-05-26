import { Venue } from '~/types/data'
import Image from 'next/image'
import { Heading, Flex, Text } from '@radix-ui/themes'
import { simplifyURL } from '~/utils'
import { LaptopIcon, InstagramLogoIcon, FrameIcon } from '@radix-ui/react-icons'
import Link from '../Link'

/**
 * @param {Venue} event
 * @returns JSX.Element
 */
type Props = {
    venue: Venue
}

/**
 * ViewArtist component
 * @param {Props}
 * @returns JSX.Element
 */
export default function ViewVenue({ venue }: Props) {
    const hasContact = Boolean(venue.instagramHandle || venue.website)
    return (
        <Flex
            direction="column"
            gap="5"
            className="min-w-6xl max-w-6xl"
            grow="1"
        >
            <Heading size="9">{venue.name}</Heading>
            <Heading>{venue.address}</Heading>
            {venue.photoPath ? (
                <Image
                    src={venue.photoPath}
                    alt={venue.photoName ?? ''}
                    height={1500}
                    width={1500}
                />
            ) : null}
            {venue.description ? (
                <Flex direction="column" gap="3" className="max-w-5xl">
                    {' '}
                    <Heading size="6">About</Heading>
                    <Text>{venue.description}</Text>
                </Flex>
            ) : null}
            <Flex direction="column" gap="2">
                {hasContact && <Heading size="6">Contact</Heading>}
                {venue.website ? (
                    <Flex gap="2" align="center">
                        <LaptopIcon width="23" height="22" />
                        <Link size="5" href={venue.website}>
                            {simplifyURL(venue.website)}
                        </Link>
                    </Flex>
                ) : null}
                {venue.instagramHandle ? (
                    <Flex gap="2" align="center">
                        <InstagramLogoIcon width="23" height="22" />
                        <Link
                            size="5"
                            href={`https://instagram.com/${venue.instagramHandle}`}
                        >
                            {venue.instagramHandle}
                        </Link>
                    </Flex>
                ) : null}
                {venue.phoneNumber && (
                    <Flex gap="2" align="center">
                        <FrameIcon width="23" height="22" />
                        <Text size="5">{venue.phoneNumber}</Text>
                    </Flex>
                )}
            </Flex>
        </Flex>
    )
}
