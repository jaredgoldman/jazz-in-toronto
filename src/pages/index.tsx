// Components
import RootLayout from '~/layouts/RootLayout'
import Featured from '~/components/Featured'
import { createServerSideHelpers } from '@trpc/react-query/server'
import { appRouter } from '~/server/api/root'
import superjson from 'superjson'
import { prisma } from '~/server/db'

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
            <div>
                <h1 className="mb-4 text-center text-3xl font-bold">
                    Follow us on Instagram
                </h1>
            </div>
            <Featured />
        </RootLayout>
    )
}
