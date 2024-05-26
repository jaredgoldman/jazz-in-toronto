import { useMemo } from 'react'
import Loading from '../Loading'
import FeaturedCard from './FeaturedCard'
import { Flex, Heading, Text, Grid } from '@radix-ui/themes'
import { api } from '~/utils/api'
import { getRandomHeadingColor } from './utils'

export default function Featured() {
    const { data: featuredItems, isLoading } = api.data.getFeatured.useQuery()

    /*
     * Check if there are actually any featured items
     */
    const hasFeaturedItems = useMemo(() => {
        return (
            featuredItems?.venue ||
            featuredItems?.event ||
            featuredItems?.artist
        )
    }, [featuredItems])

    /*
     * Generate 3 tailwind classes with random colors
     * for the featured card headings
     */
    const [c1, c2, c3] = useMemo(() => {
        const set = new Set<string>()
        while (set.size < 3) {
            set.add(getRandomHeadingColor())
        }
        return Array.from(set)
    }, [])

    return (
        <Flex
            display="flex"
            direction="column"
            justify="center"
            grow="1"
            gap="9"
            pt="9"
            px={{ initial: '1', sm: '6' }}
            mx={{ initial: '1', sm: '0' }}
            mb="6"
        >
            {hasFeaturedItems && !isLoading ? (
                <>
                    <Heading size="9" align="center" mb="5">
                        Our Favourites
                    </Heading>
                    <Grid
                        gap="7"
                        columns={{ initial: '1', md: '3' }}
                        rows={{ initial: '3', md: '1' }}
                        align="center"
                    >
                        {featuredItems?.venue && (
                            <Flex direction="column" width="100%">
                                <Heading mb="2" ml="4">
                                    Featured <Text className={c1}>Venue</Text>
                                </Heading>
                                <FeaturedCard
                                    image={featuredItems.venue?.photoPath}
                                    heading={featuredItems.venue.name}
                                    link={`/venue/${featuredItems.venue.id}`}
                                    headingClassname={c1 as string}
                                    content={featuredItems.venue.description}
                                />
                            </Flex>
                        )}
                        {featuredItems?.event && (
                            <Flex direction="column" grow="1">
                                <Heading mb="2" ml="4">
                                    Featured <Text className={c2}>Event</Text>
                                </Heading>
                                <FeaturedCard
                                    image={featuredItems.event.artist.photoPath}
                                    heading={featuredItems.event.name}
                                    link={`/event/${featuredItems.event.id}`}
                                    headingClassname={c2 as string}
                                    content={featuredItems.event.description}
                                />
                            </Flex>
                        )}
                        {featuredItems?.artist && (
                            <Flex direction="column" grow="1">
                                <Heading mb="2" ml="4">
                                    Featured <Text className={c3}>Artist</Text>
                                </Heading>
                                <FeaturedCard
                                    image={featuredItems.artist.photoPath}
                                    heading={featuredItems.artist.name}
                                    link={`/artist/${featuredItems.artist.id}`}
                                    headingClassname={c3 as string}
                                    content={featuredItems.artist.description}
                                />
                            </Flex>
                        )}
                    </Grid>
                </>
            ) : null}
            {isLoading && <Loading />}
        </Flex>
    )
}
