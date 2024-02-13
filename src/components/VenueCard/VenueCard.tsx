import Image from 'next/image'
import { Flex, Link, Heading, Text, Separator, Box } from '@radix-ui/themes'
import {
    GlobeIcon,
    FrameIcon,
    InstagramLogoIcon,
    LaptopIcon
} from '@radix-ui/react-icons'
import { Venue } from '~/types/data'
import { processIGHandle, stripFbUrl, simplifyURL } from './utils'

interface Props {
    venue: Venue
}

export default function VenueCard({ venue }: Props) {
    const { withAt, withoutAt } = processIGHandle(venue?.instagramHandle)

    return (
        <>
            <Flex
                gap="5"
                direction={{ initial: 'column', md: 'row' }}
                className="max-w-6xl"
            >
                {venue.photoPath && (
                    <Flex position="relative" className="h-96 w-full">
                        <Image
                            fill={true}
                            objectFit="cover"
                            alt={`photo of ${venue.name}`}
                            src={venue.photoPath}
                        />
                    </Flex>
                )}
                <Flex gap="2" direction="column" className="lg:max-w-[50%]">
                    <Heading size="8" mb="1">
                        {venue.name}
                    </Heading>
                    <Flex direction="column" gap="1" mb="3" grow="1">
                        {venue.description && (
                            <Flex>
                                <Text size="5" mb="3">
                                    {venue.description}
                                </Text>
                            </Flex>
                        )}
                        <Flex gap="2" align="center">
                            <GlobeIcon width="23" height="22" />
                            <Text size="5">{venue.address}</Text>
                        </Flex>
                        <Flex gap="2" align="center">
                            <FrameIcon width="23" height="22" />
                            <Text size="5">{venue.phoneNumber}</Text>
                        </Flex>
                        {venue.instagramHandle && (
                            <Flex gap="2" align="center">
                                <InstagramLogoIcon width="23" height="22" />
                                <Text size="5">
                                    <Link
                                        href={`https://instagram.com/${withoutAt}`}
                                    >
                                        {withAt}
                                    </Link>
                                </Text>
                            </Flex>
                        )}
                        {venue.facebookLink && (
                            <Flex gap="2" align="center">
                                <Text size="5">FB</Text>
                                <Link size="5" href={venue.facebookLink}>
                                    {stripFbUrl(venue.facebookLink)}
                                </Link>
                            </Flex>
                        )}
                        {venue.website && (
                            <Flex gap="2" align="center">
                                <LaptopIcon width="23" height="22" />
                                <Link size="5" href={venue.website}>
                                    {simplifyURL(venue.website)}
                                </Link>
                            </Flex>
                        )}
                    </Flex>
                    <Box display={{ initial: 'none', md: 'block' }}>
                        <Separator size="4" orientation="horizontal" />
                    </Box>
                </Flex>
            </Flex>
        </>
    )
}
