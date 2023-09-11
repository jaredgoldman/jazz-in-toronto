// Libraries
import superjson from 'superjson'
// Components
import RootLayout from '~/layouts/RootLayout'
import Featured from '~/components/Featured'
import { Button, Flex, Heading, Link } from '@radix-ui/themes'
// Utils
import { createServerSideHelpers } from '@trpc/react-query/server'
import { appRouter } from '~/server/api/root'
import { prisma } from '~/server/db'

export async function getStaticProps() {
    const helpers = createServerSideHelpers({
        router: appRouter,
        ctx: {
            prisma,
            session: null,
            scraperService: undefined,
            postService: undefined,
            emailService: undefined
        },
        transformer: superjson
    })

    await helpers.data.getFeatured.prefetch()
    return {
        props: {
            trpcState: helpers.dehydrate()
        },
        revalidate: 1
    }
}

export default function Home(props: any) {
    console.log(props)
    return (
        <RootLayout pageTitle="Jazz In Toronto | Home">
            <Heading align="center" mb="7">
                Follow us!
            </Heading>
            <Flex justify="center" mb="7">
                <Link
                    mx="3"
                    className="bg-gray-100 p-5 "
                    href="https://www.instagram.com/jazzintoronto/ "
                >
                    <Button size="4">Instagram</Button>
                </Link>
                <Link mx="3" href="https://www.facebook.com/jazzintoronto/ ">
                    <Button size="4" color="yellow">
                        Facebook
                    </Button>
                </Link>
            </Flex>
            <Featured />
        </RootLayout>
    )
}
