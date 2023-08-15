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
            <Flex direction="column">
                <Flex mx="2">
                    <div className="flex-1 border-b"></div>
                    <Heading mb="5" align="center">
                        Venue listings
                    </Heading>
                    <div className="flex-1 border-b"></div>
                </Flex>
                {venueCards}
            </Flex>
        </RootLayout>
    )
}
