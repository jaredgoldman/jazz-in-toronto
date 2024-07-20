import Image from 'next/image'
import { Flex, Link, Heading, Text } from '@radix-ui/themes'
import {
    GlobeIcon,
    FrameIcon,
    InstagramLogoIcon,
    LaptopIcon
} from '@radix-ui/react-icons'
import { Venue } from '~/types/data'
import {
    processIGHandle,
    stripFbUrl,
    simplifyURL,
    prepareForURL
} from '~/utils'

interface Props {
    venue: Venue
}

export default function VenueCard({ venue }: Props) {
    const { withAt, withoutAt } = processIGHandle(venue?.instagramHandle)

    return (
        <Flex
            gap="7"
            direction={{ initial: 'column', md: 'row' }}
            width="100%"
            className="max-w-[100rem]"
        >
            <Flex className="xs:w-6/12 h-96 w-full" position="relative">
                {venue.photoPath ? (
                    <Image
                        fill={true}
                        objectFit="cover"
                        alt={`photo of ${venue.name}`}
                        src={venue.photoPath}
                    />
                ) : null}
            </Flex>
            <Flex gap="2" direction="column" className="xs:w-6/12 w-full">
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
                        <Text size="5">{venue.address.split(',')[0]}</Text>
                    </Flex>
                    {venue.phoneNumber && (
                        <Flex gap="2" align="center">
                            <FrameIcon width="23" height="22" />
                            <Text size="5">{venue.phoneNumber}</Text>
                        </Flex>
                    )}
                    {venue.instagramHandle && (
                        <Flex gap="2" align="center">
                            <InstagramLogoIcon width="23" height="22" />
                            <Text size="5">
                                <Link
                                    href={`https://instagram.com/${withoutAt}`}
                                    className="break-all"
                                >
                                    {withAt}
                                </Link>
                            </Text>
                        </Flex>
                    )}
                    {venue.facebookLink && (
                        <Flex gap="2" align="center">
                            <Text size="5">FB</Text>
                            <Link
                                size="5"
                                href={venue.facebookLink}
                                className="break-all"
                            >
                                {stripFbUrl(venue.facebookLink)}
                            </Link>
                        </Flex>
                    )}
                    {venue.website && (
                        <Flex gap="2" align="center">
                            <LaptopIcon width="23" height="22" />
                            <Link
                                size="5"
                                href={prepareForURL(venue.website)}
                                className="break-all"
                            >
                                {simplifyURL(venue.website)}
                            </Link>
                        </Flex>
                    )}
                </Flex>
            </Flex>
        </Flex>
    )
}
