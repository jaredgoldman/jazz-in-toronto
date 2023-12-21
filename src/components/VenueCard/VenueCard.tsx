import Image from 'next/image'
import Link from 'next/link'
import { Flex, Box, Link as RLink } from '@radix-ui/themes'
import { Venue } from '~/types/data'
import { processIGHandle, stripFbUrl, simplifyURL } from './utils'

interface Props {
    venue: Venue
}

export default function VenueCard({ venue }: Props): JSX.Element {
    const { withAt, withoutAt } = processIGHandle(venue?.instagramHandle)

    return (
        <Flex mb="5">
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
    )
}
