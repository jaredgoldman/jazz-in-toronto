import { Heading, Text, Flex, Box, Separator } from '@radix-ui/themes'
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
                image: '/images/jit-gig.jpg',
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
        <Flex grow="1" direction="column">
            <Heading size={{ initial: '8', md: '9' }}>Recurring Gigs</Heading>
            <Separator size="4" mb="6" />
            <Flex direction="column" gap="7">
                {gigDays.map(({ day, gigs }) => {
                    return (
                        <Flex
                            direction="column"
                            align="start"
                            key={day}
                            gap="3"
                        >
                            <Heading size="8" mb="6">
                                {day}
                            </Heading>
                            <Flex direction="column" gap="8" width="100%">
                                {gigs.map((gig) => {
                                    const time = format(gig.time, 'h:mm b')
                                    const gigString = `${time} - ${gig.artist} @ ${gig.venue}`
                                    return (
                                        <Flex justify="between" key={gigString}>
                                            <Flex
                                                className="max-w-xl"
                                                direction="column"
                                            >
                                                <Heading mb="4" align="left">
                                                    {gigString}
                                                </Heading>
                                                <Text
                                                    size="4"
                                                    align="left"
                                                    className="max-w-md"
                                                    mr="2"
                                                >
                                                    {gig.description}
                                                </Text>
                                            </Flex>
                                            {gig.image && (
                                                <Box
                                                    display={{
                                                        initial: 'none',
                                                        sm: 'block'
                                                    }}
                                                >
                                                    <Image
                                                        src={gig.image}
                                                        alt={`image for ${gigString}`}
                                                        width={500}
                                                        height={600}
                                                        className="w-max max-w-[20rem] object-contain"
                                                    />
                                                </Box>
                                            )}
                                        </Flex>
                                    )
                                })}
                            </Flex>
                        </Flex>
                    )
                })}
            </Flex>
        </Flex>
    )
}
