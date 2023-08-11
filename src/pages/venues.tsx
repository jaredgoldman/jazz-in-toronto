// Components
import RootLayout from '~/layouts/RootLayout'
import VenueCard from '~/components/VenueCard/VenueCard'
import Loading from '~/components/Loading'
// Uti;s
import { api } from '~/utils/api'
import Container from '~/components/Container'

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
        <RootLayout>
            <Container maxWidth="xl">
                <div className="w-full">
                    <div className="mx-2 flex items-center justify-center">
                        <div className="flex-1 border-b"></div>
                        <h1 className="px-4 text-center text-xl">
                            Venue listings
                        </h1>
                        <div className="flex-1 border-b"></div>
                    </div>
                    {venueCards}
                </div>
            </Container>
        </RootLayout>
    )
}
