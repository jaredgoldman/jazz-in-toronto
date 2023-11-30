// Components
import {
    Box,
    Container,
    Heading,
    Card,
    Text,
    Flex,
    AspectRatio
} from '@radix-ui/themes'
import Image from 'next/image'
// Utils
import { getFormattedTime } from '~/utils/date'

const gigDays = [
    {
        day: 'Monday',
        gigs: [
            {
                image: '/team.jpg',
                artist: 'test',
                venue: 'test',
                description: 'test',
                time: new Date()
            }
        ]
    },
    { day: 'Tuesday', gigs: [] },
    { day: 'Wednesday', gigs: [] },
    { day: 'Thursday', gigs: [] },
    { day: 'Friday', gigs: [] },
    { day: 'Saturday', gigs: [] },
    { day: 'Sunday', gigs: [] }
]

export default function RecurringGigs() {
    return (
        <Container>
            <Box>
                {gigDays.map(({ day, gigs }) => {
                    if (gigs.length) {
                        return (
                            <Container key={day}>
                                <Heading size="8" mb="4">
                                    {day}
                                </Heading>
                                <Card mb="5">
                                    {gigs.map((gig) => {
                                        const gigString = `${getFormattedTime(
                                            gig.time
                                        )} - ${gig.artist} @ ${gig.venue}`
                                        return (
                                            <Flex
                                                key={`${gig.artist}_${gig.venue}`}
                                            >
                                                <Box className="max-w-xl" p="2">
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
                                                    <Box
                                                        width="100%"
                                                        height="auto"
                                                        p="6"
                                                    >
                                                        <AspectRatio
                                                            ratio={1 / 1}
                                                        >
                                                            <Image
                                                                src={gig.image}
                                                                alt={`image for ${gigString}`}
                                                                className="h-full w-full object-cover"
                                                                fill={true}
                                                            />
                                                        </AspectRatio>
                                                    </Box>
                                                )}
                                            </Flex>
                                        )
                                    })}
                                </Card>
                            </Container>
                        )
                    }
                })}
            </Box>
        </Container>
    )
}
