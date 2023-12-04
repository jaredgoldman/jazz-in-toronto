import Loading from '../Loading'
import FeaturedCard from './FeaturedCard'
import { Flex, Heading } from '@radix-ui/themes'
import { api } from '~/utils/api'

export default function Featured() {
    const { data: featuredItems, isLoading } = api.data.getFeatured.useQuery()

    return (
        <Flex
            mb="2"
            display="flex"
            direction="column"
            justify="center"
        >
            <Heading size="9"mb="7">
                Featured
            </Heading>
            {featuredItems && !isLoading ? (
                <Flex gap="5" >
                    {featuredItems?.venue && (
                        <FeaturedCard
                            image={featuredItems.venue?.photoPath}
                            title={featuredItems.venue.name}
                            link={featuredItems.venue?.website}
                        />
                    )}
                    {featuredItems?.event && (
                        <FeaturedCard
                            /* image={featuredItems.event.artist.photoPath} */
                            title={featuredItems.event.name}
                            link={featuredItems.event?.website}
                        />
                    )}
                    {featuredItems?.artist && (
                        <FeaturedCard
                            image={featuredItems.artist.photoPath}
                            title={featuredItems.artist.name}
                            link={featuredItems.artist?.website}
                        />
                    )}
                </Flex>
            ) : (
                <Loading />
            )}
        </Flex>
    )
}
