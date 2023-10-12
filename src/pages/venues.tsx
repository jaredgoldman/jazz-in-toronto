// Components
import RootLayout from '~/layouts/RootLayout'
import VenueCard from '~/components/VenueCard/VenueCard'
import Loading from '~/components/Loading'
// Uti;s
import { api } from '~/utils/api'
import { Flex, Heading } from '@radix-ui/themes'

export default function Venues(): JSX.Element {
    const { data: venues, isLoading } = api.venue.getAll.useQuery()

    const venueCards =
        !venues || isLoading ? (
            <Loading />
        ) : (
            venues.map((venue) => {
                return <VenueCard key={venue.id} venue={venue} />
            })
        )

    return (
        <RootLayout pageTitle="Jazz In Toronto | Venues">
            <Heading mb="5" align="center" size="9">
                Venues
            </Heading>
            <Flex direction="column" my="9">
                {venueCards}
            </Flex>
        </RootLayout>
    )
}
