// Components
import RootLayout from '~/layouts/RootLayout'
import Featured from '~/components/Featured'
import { createServerSideHelpers } from '@trpc/react-query/server'
import { appRouter } from '~/server/api/root'
import superjson from 'superjson'
import { prisma } from '~/server/db'
import { Flex, Heading, Link } from '@radix-ui/themes'

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
        <RootLayout pageTitle="Jazz In Toronto | Home">
            <Heading align="center" mb="5">
                Follow us!
            </Heading>
            <Flex justify="center" mb="5">
                <Link mx="2" href="https://www.instagram.com/jazzintoronto/ ">
                    instagram
                </Link>
                <Link mx="2" href="https://www.facebook.com/jazzintoronto/ ">
                    Facebook
                </Link>
            </Flex>
            <Featured />
        </RootLayout>
    )
}
