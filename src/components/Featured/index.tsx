import FeaturedCard from './FeaturedCard'
import { api } from '~/utils/api'
import Loading from '../Loading'
import Container from '../Container'

export default function Featured() {
    const { data: featuredItems, isLoading } =
        api.featured.getFeatured.useQuery()

    return (
        <div>
            <h1 className="mb-4 w-full text-center text-2xl font-bold">
                Our Faves
            </h1>
            <Container justify="center">
                {featuredItems && !isLoading ? (
                    <div className="mb-5">
                        {featuredItems?.venue && (
                            <FeaturedCard
                                image={featuredItems.venue?.photoPath}
                                title={featuredItems.venue.name}
                                link={featuredItems.venue?.website}
                            />
                        )}
                        {featuredItems?.event && (
                            <FeaturedCard
                                image={featuredItems.event.band.photoPath}
                                title={featuredItems.event.name}
                                link={featuredItems.event?.website}
                            />
                        )}
                        {featuredItems?.band && (
                            <FeaturedCard
                                image={featuredItems.band.photoPath}
                                title={featuredItems.band.name}
                                link={featuredItems.band?.website}
                            />
                        )}
                    </div>
                ) : (
                    <Loading />
                )}
            </Container>
        </div>
    )
}
