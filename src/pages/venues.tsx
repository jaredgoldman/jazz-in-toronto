import RootLayout from "~/layouts/RootLayout"
import VenueCard from "~/components/VenueCard/VenueCard"
import { api } from "~/utils/api"

export default function Venues(): JSX.Element {
    const { data: venues, isLoading } = api.venue.getAll.useQuery()

    const venueCards = !venues || isLoading ? <div>Loading...</div> : venues.map((venue) => {
        return <VenueCard key={venue.id} venue={venue} />
    })

    return (
        <RootLayout>
            <main>{venueCards}</main>
        </RootLayout>
    )
}
