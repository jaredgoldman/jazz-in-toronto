// Components
import RootLayout from '~/layouts/RootLayout'
import Featured from '~/components/Featured'
import { createServerSideHelpers } from '@trpc/react-query/server'
import { appRouter } from '~/server/api/root'
import superjson from 'superjson'
import { prisma } from '~/server/db'
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
            <div className="mb-1 flex w-full flex-col items-center">
                <h1 className="mb-10 text-center text-2xl font-bold">
                    Follow us!
                </h1>
                <div className="mb-7 flex w-3/4 max-w-lg justify-evenly lg:w-1/2">
                    <Button
                        size="sm"
                        link="https://www.instagram.com/jazzintoronto/ "
                    >
                        instagram
                    </Button>
                    <Button
                        size="sm"
                        link="https://www.facebook.com/jazzintoronto/ "
                    >
                        Facebook
                    </Button>
                </div>
            </div>
            <Featured />
        </RootLayout>
    )
}
