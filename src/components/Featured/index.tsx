import FeaturedCard from './FeaturedCard'
import { api } from '~/utils/api'
import Loading from '../Loading'

export default function Featured() {
    const { data: featuredItems, isLoading } =
        api.featured.getFeatured.useQuery()

    return (
        <div className="flex-grow">
            <h1 className="mb-4 w-full text-center text-3xl font-bold">
                Featured
            </h1>
            {featuredItems && !isLoading ? (
                <div className="flex">
                    {featuredItems?.venue && (
                        <FeaturedCard
                            title="Featured Venue"
                            image={featuredItems?.venue?.photoPath}
                            content={featuredItems.venue.name}
                        />
                    )}
                    {featuredItems?.event && (
                        <FeaturedCard
                            title="Featured Event"
                            image={featuredItems.event.band.photoPath}
                            content={featuredItems.event.name}
                        />
                    )}
                    {featuredItems?.band && (
                        <FeaturedCard
                            title="Featured Band "
                            image={featuredItems.band.photoPath}
                            content={featuredItems.band.name}
                        />
                    )}
                </div>
            ) : (
                <Loading />
            )}
        </div>
    )
}
