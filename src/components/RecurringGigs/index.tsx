import { Box, Container, Heading, Card, Text, Flex } from '@radix-ui/themes'
import Image from 'next/image'
import {
    type ComponentGigRecurringGig,
    Enum_Componentgigrecurringgig_Day as Day,
    type ListingPageQuery
} from '~/gql/graphql'

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
            {data?.Heading && (
                <Heading mb="5" align="center">
                    {data.Heading}
                </Heading>
            )}
            <Box>
                {Object.entries(days).map(([day, gigs]) => {
                    if (gigs.length) {
                        return (
                            <Card mb="5" key={day}>
                                <Heading>{day}</Heading>
                                {gigs.map((gig) => {
                                    const gigImage =
                                        gig.image?.data?.attributes?.url
                                    const gigString = `${
                                        gig.time as string
                                    } - ${gig.artist} @ ${gig.venue}`
                                    return (
                                        <Flex key={gig.id}>
                                            <Box>
                                                <Heading>{gigString}</Heading>
                                                <Text>{gig.description}</Text>
                                            </Box>
                                            {gigImage && (
                                                <Box m="auto" p="3">
                                                    <Image
                                                        src={gigImage}
                                                        alt={`image for ${gigString}`}
                                                        width={400}
                                                        height={400}
                                                    />
                                                </Box>
                                            )}
                                        </Flex>
                                    )
                                })}
                            </Card>
                        )
                    }
                })}
            </Box>
        </Container>
    )
}
