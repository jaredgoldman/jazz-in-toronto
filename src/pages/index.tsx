// Components
import RootLayout from '~/layouts/RootLayout'
import Featured from '~/components/Featured'
import { createServerSideHelpers } from '@trpc/react-query/server'
import { appRouter } from '~/server/api/root'
import superjson from 'superjson'
import { prisma } from '~/server/db'
import { Box, Flex, Heading } from '@radix-ui/themes'
import Button from '~/components/Button'

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
                <Button link="https://www.instagram.com/jazzintoronto/ ">
                    instagram
                </Button>
                <Button link="https://www.facebook.com/jazzintoronto/ ">
                    Facebook
                </Button>
            </Flex>
            <Featured />
        </RootLayout>
    )
}
