import FeaturedVenue from './FeaturedVenue'
import FeaturedEvent from './FeaturedEvent'
import FeaturedBand from './FeaturedBand'

export default function Featured() {
    return (
        <div className="featured">
            <FeaturedVenue />
            <FeaturedEvent />
            <FeaturedBand />
        </div>
    )
}
