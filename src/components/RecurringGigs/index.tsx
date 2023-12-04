import { Heading, Text, Flex, Box, Callout } from '@radix-ui/themes'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import Image from 'next/image'

const gigDays = [
    {
        day: 'Monday',
        gigs: [
            {
                image: '/images/team.jpg',
                artist: 'Artist Name',
                venue: 'Venue Name',
                description:
                    'Test description about how awesome the gig is and any other relevant details',
                time: new Date()
            },
            {
                image: '/images/team.jpg',
                artist: 'Artist Name',
                venue: 'Venue Name',
                description:
                    'Test description about how awesome the gig is and any other relevant details',
                time: new Date()
            }
        ]
    },
    {
        day: 'Tuesday',
        gigs: [
            {
                image: '/images/team.jpg',
                artist: 'Artist Name',
                venue: 'Venue Name',
                description:
                    'Test description about how awesome the gig is and any other relevant details',
                time: new Date()
            },
            {
                image: '/images/team.jpg',
                artist: 'Artist Name',
                venue: 'Venue Name',
                description:
                    'Test description about how awesome the gig is and any other relevant details',
                time: new Date()
            }
        ]
    },
    {
        day: 'Wednesday',
        gigs: [
            {
                image: '/images/team.jpg',
                artist: 'Artist Name',
                venue: 'Venue Name',
                description:
                    'Test description about how awesome the gig is and any other relevant details',
                time: new Date()
            }
        ]
    },
    {
        day: 'Thursday',
        gigs: [
            {
                image: '/images/team.jpg',
                artist: 'Artist Name',
                venue: 'Venue Name',
                description:
                    'Test description about how awesome the gig is and any other relevant details',
                time: new Date()
            }
        ]
    },
    {
        day: 'Friday',
        gigs: [
            {
                image: '/images/team.jpg',
                artist: 'Artist Name',
                venue: 'Venue Name',
                description:
                    'Test description about how awesome the gig is and any other relevant details',
                time: new Date()
            }
        ]
    },
    {
        day: 'Saturday',
        gigs: [
            {
                image: '/images/team.jpg',
                artist: 'Artist Name',
                venue: 'Venue Name',
                description:
                    'Test description about how awesome the gig is and any other relevant details',
                time: new Date()
            }
        ]
    },
    {
        day: 'Sunday',
        gigs: [
            {
                image: '/images/team.jpg',
                artist: 'Artist Name',
                venue: 'Venue Name',
                description:
                    'Test description about how awesome the gig is and any other relevant details',
                time: new Date()
            }
        ]
    }
]

export default function RecurringGigs() {
    return (
        <Box mb="9">
            <Heading size="9" mb="8" align="right">
                Recurring Gigs
            </Heading>
            <Callout.Root mb="8">
                <Callout.Icon>
                    <InfoCircledIcon />
                </Callout.Icon>
                <Callout.Text>
                    Have a regular gig you'd like us to feature here? Email us
                    at{' '}
                    <a href="mailto:support@jazzintoronto.com">
                        support@jazzintoronto.com
                    </a>
                </Callout.Text>
            </Callout.Root>
            <Box>
                {gigDays.map(({ day, gigs }, i) => {
                    const indexIsEven = Boolean(i % 2)
                    return (
                        <Flex
                            direction="column"
                            align={indexIsEven ? 'end' : 'start'}
                            key={day}
                            gap="6"
                        >
                            <Heading size="8" mb="4">
                                {day}
                            </Heading>
                            {gigs.map((gig) => {
                                const time = format(gig.time, 'h:mm b')
                                const gigString = `${time} - ${gig.artist} @ ${gig.venue}`
                                return (
                                    <Flex
                                        key={`${gig.artist}_${gig.venue}`}
                                        direction={
                                            indexIsEven ? 'row' : 'row-reverse'
                                        }
                                    >
                                        <Flex className="max-w-xl" direction="column" px="4">
                                            <Heading
                                                mb="4"
                                                align={
                                                    indexIsEven
                                                        ? 'right'
                                                        : 'left'
                                                }
                                            >
                                                {gigString}
                                            </Heading>
                                            <Text
                                                size="4"
                                                align={
                                                    indexIsEven
                                                        ? 'right'
                                                        : 'left'
                                                }
                                            >
                                                {gig.description}
                                            </Text>
                                        </Flex >
                                        {gig.image && (
                                            <Image
                                                src={gig.image}
                                                alt={`image for ${gigString}`}
                                                width={200}
                                                height={600}
                                            />
                                        )}
                                    </Flex>
                                )
                            })}
                        </Flex>
                    )
                })}
            </Box>
        </Box>
    )
}
