// Components
import Image from 'next/image'
import Link from 'next/link'
import { Card, Flex, Box, Link as RLink } from '@radix-ui/themes'
// Types
import { type Venue } from '~/types/data'

interface Props {
    venue: Venue
}

const simplifyURL = (url: string) => {
    url = stripHttp(url)
    if (url.endsWith('/')) {
        url = url.slice(0, -1)
    }

    return url
}

const stripEndingSlash = (url: string) => {
    if (url.endsWith('/')) {
        url = url.slice(0, -1)
    }
    return url
}

const stripHttp = (url: string) => {
    if (url.startsWith('https://')) {
        url = url.substring(8)
    }
    if (url.startsWith('http://')) {
        url = url.substring(7)
    }
    return url
}

const stripFbUrl = (url: string) => {
    url = stripHttp(url)
    url = stripEndingSlash(url)
    if (url.startsWith('facebook.com')) {
        url = url.substring(11)
    }
    if (url.startsWith('www.facebook.com')) {
        url = url.substring(16)
    }
    url = url.replace('/', '')
    return url
}

const processIGHandle = (handle: string | null) => {
    let withAt = ''
    let withoutAt = ''

    if (handle) {
        if (!handle.startsWith('@')) {
            withAt = `@${handle}`
            withoutAt = handle
        } else {
            withAt = handle
            withoutAt = handle.replace('@', '')
        }
    }

    return {
        withAt,
        withoutAt
    }
}

export default function VenueCard({ venue }: Props): JSX.Element {
    const { withAt, withoutAt } = processIGHandle(venue?.instagramHandle)

    return (
        <Card mb="2" size="3">
            <Flex>
                <Box className="relative h-[10rem] w-[10rem] object-contain">
                    {venue.photoPath && (
                        <Image
                            fill={true}
                            alt={`photo of ${venue.name}`}
                            src={venue.photoPath}
                        />
                    )}
                </Box>
                <Flex my="2" ml="5" direction="column">
                    <Box className="mb-5 text-lg">{venue.name}</Box>
                    <Box className="mb-7 text-xs">
                        <Box>{venue.address}</Box>
                        <Box>{venue.phoneNumber}</Box>
                        <Box className="flex flex-col sm:flex-row">
                            {venue.instagramHandle && (
                                <span>
                                    IG:{' '}
                                    <Link
                                        href={`https://instagram.com/${withoutAt}`}
                                    >
                                        <RLink>{withAt}</RLink>
                                    </Link>
                                </span>
                            )}
                            {venue.facebookLink && (
                                <span className="sm:ml-2 ">
                                    FB:{' '}
                                    <Link
                                        className="text-blue-500"
                                        href={venue.facebookLink}
                                    >
                                        <RLink>
                                            {stripFbUrl(venue.facebookLink)}
                                        </RLink>
                                    </Link>
                                </span>
                            )}
                        </Box>
                    </Box>
                    <Link className="text-xs" href={venue.website}>
                        <RLink>{simplifyURL(venue.website)}</RLink>
                    </Link>
                </Flex>
            </Flex>
        </Card>
    )
}
