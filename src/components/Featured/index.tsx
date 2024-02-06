import { useMemo } from 'react'
import Loading from '../Loading'
import FeaturedCard from './FeaturedCard'
import { Flex, Heading, Text } from '@radix-ui/themes'
import { api } from '~/utils/api'
import { getRandomHeadingColor } from './utils'

export default function Featured() {
    const { data: featuredItems, isLoading } = api.data.getFeatured.useQuery()

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
            px="6"
            mb="6"
        >
            <Heading size="9" align="center" mb="5">
                Our Favourites
            </Heading>
            {featuredItems && !isLoading ? (
                <Flex
                    gap="7"
                    direction={{ initial: 'column', md: 'row' }}
                    grow="1"
                >
                    {featuredItems?.venue && (
                        <Flex direction="column">
                            <Heading mb="2" ml="4">
                                Featured <Text>Venue</Text>
                            </Heading>
                            <FeaturedCard
                                image={featuredItems.venue?.photoPath}
                                heading={featuredItems.venue.name}
                                link={featuredItems.venue?.website}
                                headingClassname={c1 as string}
                            />
                        </Flex>
                    )}
                    {featuredItems?.event && (
                        <Flex direction="column">
                            <Heading mb="2" ml="4">
                                Featured <Text>Event</Text>
                            </Heading>
                            <FeaturedCard
                                image={featuredItems.event.artist.photoPath}
                                heading={featuredItems.event.name}
                                link={featuredItems.event?.website}
                                headingClassname={c2 as string}
                            />
                        </Flex>
                    )}
                    {featuredItems?.artist && (
                        <Flex direction="column">
                            <Heading mb="2" ml="4">
                                Featured <Text>Artist</Text>
                            </Heading>
                            <FeaturedCard
                                image={featuredItems.artist.photoPath}
                                heading={featuredItems.artist.name}
                                link={featuredItems.artist?.website}
                                headingClassname={c3 as string}
                            />
                        </Flex>
                    )}
                </Flex>
            ) : (
                <Loading />
            )}
        </Flex>
    )
}
