// Components
import RootLayout from '~/layouts/RootLayout'
import Featured from '~/components/Featured'
import { createServerSideHelpers } from '@trpc/react-query/server'
import { appRouter } from '~/server/api/root'
import superjson from 'superjson'
import { prisma } from '~/server/db'
import { Badge, Flex, Heading, Link } from '@radix-ui/themes'

export async function getStaticProps() {
    const helpers = createServerSideHelpers({
        router: appRouter,
        ctx: {
            prisma,
            session: null,
            scraperService: undefined,
            postService: undefined
        },
        transformer: superjson
    })

    await helpers.featured.getFeatured.prefetch()
    return {
        props: {
            trpcState: helpers.dehydrate()
        },
        revalidate: 1
    }
}

export default function Home() {
    return (
        <RootLayout>
            <Heading align="center" mb="5">
                Follow us!
            </Heading>
            <Flex justify="center" mb="5">
                <Badge size="2" mx="3" variant="solid">
                    <Link href="https://www.instagram.com/jazzintoronto/ ">
                        instagram
                    </Link>
                </Badge>
                <Badge mx="3" size="2" variant="solid">
                    <Link href="https://www.facebook.com/jazzintoronto/ ">
                        Facebook
                    </Link>
                </Badge>
            </Flex>
            <Featured />
        </RootLayout>
    )
}
