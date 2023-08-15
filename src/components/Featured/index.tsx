// Components
import Loading from '../Loading'
import FeaturedCard from './FeaturedCard'
import { Flex, Heading } from '@radix-ui/themes'
// Utisl
import { api } from '~/utils/api'

export default function Featured() {
    const { data: featuredItems, isLoading } =
        api.featured.getFeatured.useQuery()

    return (
        <Flex
            mb="2"
            display="flex"
            direction="column"
            justify="center"
            className="max-w-5xl"
        >
            <Heading align="center" mb="5">
                Our Faves
            </Heading>
            {featuredItems && !isLoading ? (
                <Flex
                    direction={{ initial: 'column', md: 'row' }}
                    m="3"
                    className="justify-center"
                >
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
                </Flex>
            ) : (
                <Loading />
            )}
        </Flex>
    )
}
