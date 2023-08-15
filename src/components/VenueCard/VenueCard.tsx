// Components
import Image from 'next/image'
import Link from 'next/link'
import { Card, Flex } from '@radix-ui/themes'
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
                <div className="relative h-[10rem] w-[10rem] object-contain">
                    {venue.photoPath && (
                        <Image
                            fill={true}
                            alt={`photo of ${venue.name}`}
                            src={venue.photoPath}
                        />
                    )}
                </div>
                <Flex my="2" ml="5" direction="column">
                    <div className="mb-5 text-lg">{venue.name}</div>
                    <div className="mb-7 text-xs">
                        <div>{venue.address}</div>
                        <div>{venue.phoneNumber}</div>
                        <div className="flex flex-col sm:flex-row">
                            {venue.instagramHandle && (
                                <span>
                                    IG:{' '}
                                    <Link
                                        className="text-blue-500"
                                        href={`https://instagram.com/${withoutAt}`}
                                    >
                                        {withAt}
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
                                        {stripFbUrl(venue.facebookLink)}
                                    </Link>
                                </span>
                            )}
                        </div>
                    </div>
                    <Link className="text-xs" href={venue.website}>
                        {simplifyURL(venue.website)}
                    </Link>
                </Flex>
            </Flex>
        </Card>
    )
}
