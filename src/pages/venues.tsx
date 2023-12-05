import RootLayout from '~/layouts/RootLayout'
import VenueCard from '~/components/VenueCard/VenueCard'
import { api } from '~/utils/api'
import { Flex, Heading, Box } from '@radix-ui/themes'
import { useMemo } from 'react'

export default function Venues(): JSX.Element {
    const { data } = api.venue.getAll.useQuery()

    const venueCards = useMemo(
        () =>
            data?.length
                ? data.map((venue) => {
                      return <VenueCard key={venue.id} venue={venue} />
                  })
                : [],
        [data]
    )

    return (
        <RootLayout pageTitle="Jazz In Toronto | Venues">
            <Box p="9">
                <Heading mb="8" size="9">
                    Venues
                </Heading>
                <Flex direction="column" gap="5">
                    {venueCards}
                </Flex>
            </Box>
        </RootLayout>
    )
}
