import FeaturedVenue from './FeaturedVenue'
import FeaturedEvent from './FeaturedEvent'
import FeaturedBand from './FeaturedBand'
import { api } from '~/utils/api'
import Loading from '../Loading'

export default function Featured() {
    const { data: featuredItems, isLoading } =
        api.featured.getFeatured.useQuery()

    return (
        <div className="flex-grow">
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
                <Loading />
            )}
        </div>
    )
}
