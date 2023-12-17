import { useMemo } from 'react'
import RootLayout from '~/layouts/RootLayout'
import VenueCard from '~/components/VenueCard/VenueCard'
import { api } from '~/utils/api'
import { Flex, Heading, Text } from '@radix-ui/themes'
import Link from '~/components/Link'

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
        <RootLayout
            pageTitle="Jazz In Toronto | Venues"
            calloutContent={
                <Text>
                    Don’t see your venue listed below?{' '}
                    <Link href="/venue">
                        Submit a request to add your venue
                    </Link>
                </Text>
            }
        >
            <Flex direction="column" mb="6" p="6">
                <Heading mb="8" size="9">
                    Venues
                </Heading>
                <Flex direction="column" gap="5">
                    {venueCards}
                </Flex>
            </Flex>
        </RootLayout>
    )
}
