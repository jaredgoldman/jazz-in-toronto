import FeaturedVenue from './FeaturedVenue'
import FeaturedEvent from './FeaturedEvent'
import FeaturedBand from './FeaturedBand'
import { api } from '~/utils/api'

export default function Featured() {
    const { data: featuredItems, isLoading } =
        api.featured.getFeatured.useQuery()

    return (
        <div className="h-[70vh] flex-grow">
            {featuredItems && !isLoading ? (
                <div className="flex">
                    {featuredItems?.venue && (
                        <FeaturedVenue venue={featuredItems.venue} />
                    )}
                    {featuredItems?.event && (
                        <FeaturedEvent event={featuredItems.event} />
                    )}
                    {featuredItems?.band && (
                        <FeaturedBand band={featuredItems.band} />
                    )}
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    )
}
