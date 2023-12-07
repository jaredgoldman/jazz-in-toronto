import { Heading, Text, Flex, Box } from '@radix-ui/themes'
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
        <Box p="5">
            <Heading size="9" mb="8" align="left">
                Recurring Gigs
            </Heading>
            <Flex direction="column" gap="7">
                {gigDays.map(({ day, gigs }, i) => {
                    return (
                        <Flex
                            direction="column"
                            align="start"
                            key={day}
                            gap="3"
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
                                        p="4"
                                        className="bg-zinc-800"
                                    >
                                        <Flex
                                            className="max-w-xl"
                                            direction="column"
                                        >
                                            <Heading mb="4" align="left">
                                                {gigString}
                                            </Heading>
                                            <Text size="4" align="left">
                                                {gig.description}
                                            </Text>
                                        </Flex>
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
            </Flex>
        </Box>
    )
}
