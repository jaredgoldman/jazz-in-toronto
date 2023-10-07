import {
    Box,
    Container,
    Heading,
    Card,
    Text,
    Flex,
    AspectRatio
} from '@radix-ui/themes'
import {
    type ComponentGigRecurringGig,
    Enum_Componentgigrecurringgig_Day as Day,
    type ListingPageQuery
} from '~/gql/graphql'
import { convertAndFormatTime } from '~/utils/date'
interface Props {
    cmsData: ListingPageQuery
}

export default function RecurringGigs({ cmsData }: Props) {
    const data = cmsData.listing?.data?.attributes

    const days: { [key in Day]: ComponentGigRecurringGig[] } = {
        [Day.Monday]: [],
        [Day.Tuesday]: [],
        [Day.Wednesday]: [],
        [Day.Thursday]: [],
        [Day.Friday]: [],
        [Day.Saturday]: [],
        [Day.Sunday]: []
    }

    if (data?.recurringGig) {
        data.recurringGig.forEach((gig) => {
            if (gig?.day && days[gig.day]) {
                days[gig.day].push(gig as ComponentGigRecurringGig)
            }
        })
    }

    return (
        <Container py="7">
            <Box>
                {Object.entries(days).map(([day, gigs]) => {
                    if (gigs.length) {
                        return (
                            <>
                                <Heading size="8" mb="4">
                                    {day}
                                </Heading>
                                <Card mb="5" key={day}>
                                    {gigs.map((gig) => {
                                        const gigImage =
                                            gig.image?.data?.attributes?.url
                                        const gigString = `${convertAndFormatTime(
                                            gig.time as string
                                        )} - ${gig.artist} @ ${gig.venue}`
                                        return (
                                            <Flex key={gig.id}>
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
                                                {gigImage && (
                                                    <Box
                                                        width="100%"
                                                        height="auto"
                                                        p="6"
                                                    >
                                                        <AspectRatio
                                                            ratio={1 / 1}
                                                        >
                                                            <img
                                                                src={gigImage}
                                                                alt={`image for ${gigString}`}
                                                                style={{
                                                                    objectFit:
                                                                        'cover',
                                                                    width: '100%',
                                                                    height: '100%'
                                                                }}
                                                            />
                                                        </AspectRatio>
                                                    </Box>
                                                )}
                                            </Flex>
                                        )
                                    })}
                                </Card>
                            </>
                        )
                    }
                })}
            </Box>
        </Container>
    )
}
