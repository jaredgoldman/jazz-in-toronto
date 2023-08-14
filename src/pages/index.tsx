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
            session: null
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
            <Flex justify="center" align="center" height="9" mb="5">
                <Link href="https://www.instagram.com/jazzintoronto/ ">
                    instagram
                </Link>
                <Link href="https://www.facebook.com/jazzintoronto/ ">
                    Facebook
                </Link>
            </Flex>
            <Featured />
        </RootLayout>
    )
}
