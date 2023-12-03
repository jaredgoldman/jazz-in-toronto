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
        []
    )

    return (
        <RootLayout pageTitle="Jazz In Toronto | Venues">
            <Box p="5">
                <Heading mb="5" size="9">
                    Venues
                </Heading>
                <Flex direction="column" my="9">
                    {venueCards}
                </Flex>
            </Box>
        </RootLayout>
    )
}
