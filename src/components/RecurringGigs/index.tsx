// Components
import {
    Container,
    Heading,
    Text,
    Flex,
    AspectRatio,
    Box
} from '@radix-ui/themes'
import { format } from 'date-fns'
import Image from 'next/image'
// Utils
import { getFormattedTime } from '~/utils/date'

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
        <Box my="5" px="5">
            <Heading size="9" mb="6">
                Recurring Gigs
            </Heading>
            <Box>
                {gigDays.map(({ day, gigs }) => {
                    return (
                        <Flex direction="column" key={day} mb="5">
                            <Heading size="8" mb="4">
                                {day}
                            </Heading>
                            {gigs.map((gig) => {
                                const time = format(gig.time, 'h:mm b')
                                const gigString = `${time} - ${gig.artist} @ ${gig.venue}`
                                return (
                                    <Flex key={`${gig.artist}_${gig.venue}`}>
                                        <Box className="max-w-xl">
                                            <Heading mb="4" mt="1">
                                                {gigString}
                                            </Heading>
                                            <Box className="max-w-[90%]">
                                                <Text size="4">
                                                    {gig.description}
                                                </Text>
                                            </Box>
                                        </Box>
                                        {gig.image && (
                                            <Box className="relative h-[10rem] w-[10rem] object-contain">
                                                <Image
                                                    src={gig.image}
                                                    alt={`image for ${gigString}`}
                                                    className="h-full w-full object-cover"
                                                    fill={true}
                                                />
                                            </Box>
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
