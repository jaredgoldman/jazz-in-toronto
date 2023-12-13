import RootLayout from '~/layouts/RootLayout'
import VenueCard from '~/components/VenueCard/VenueCard'
import { api } from '~/utils/api'
import { Flex, Heading, Box, Callout } from '@radix-ui/themes'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import { useMemo } from 'react'
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
        <RootLayout pageTitle="Jazz In Toronto | Venues">
            <Callout.Root>
                <Callout.Icon>
                    <InfoCircledIcon />
                </Callout.Icon>
                <Callout.Text>
                    Don’t see your venue listed below?{' '}
                    <Link href="/venue">
                        Submit a request to add your venue
                    </Link>
                </Callout.Text>
            </Callout.Root>
            <Box p="5" mb="5">
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
