// Components
import RootLayout from '~/layouts/RootLayout'
import VenueCard from '~/components/VenueCard/VenueCard'
import Loading from '~/components/Loading'
// Uti;s
import { api } from '~/utils/api'

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
            <main>{venueCards}</main>
        </RootLayout>
    )
}
