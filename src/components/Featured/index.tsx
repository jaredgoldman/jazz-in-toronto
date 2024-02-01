import Loading from '../Loading'
import FeaturedCard from './FeaturedCard'
import { Flex, Heading } from '@radix-ui/themes'
import { api } from '~/utils/api'

export default function Featured() {
    const { data: featuredItems, isLoading } = api.data.getFeatured.useQuery()

    return (
        <Flex
            display="flex"
            direction="column"
            justify="center"
            grow="1"
            gap="9"
            pt="9"
            px="6"
            mb="6"
        >
            <Heading size="9" align="center">
                Our Favourites
            </Heading>
            {featuredItems && !isLoading ? (
                <Flex
                    gap="7"
                    direction={{ initial: 'column', md: 'row' }}
                    grow="1"
                >
                    {featuredItems?.venue && (
                        <FeaturedCard
                            image={featuredItems.venue?.photoPath}
                            title={featuredItems.venue.name}
                            link={featuredItems.venue?.website}
                            type="Venue"
                        />
                    )}
                    {featuredItems?.event && (
                        <FeaturedCard
                            image={featuredItems.event.artist.photoPath}
                            title={featuredItems.event.name}
                            link={featuredItems.event?.website}
                            type="Event"
                        />
                    )}
                    {featuredItems?.artist && (
                        <FeaturedCard
                            image={featuredItems.artist.photoPath}
                            title={featuredItems.artist.name}
                            link={featuredItems.artist?.website}
                            type="Artist"
                        />
                    )}
                </Flex>
            ) : (
                <Loading />
            )}
        </Flex>
    )
}
