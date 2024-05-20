import { useRouter } from 'next/router'
import { Flex } from '@radix-ui/themes'
import RootLayout from '~/layouts/RootLayout'
import { api } from '~/utils/api'
import Loading from '~/components/Loading'
import ViewVenue from '~/components/ViewVenue'

export default function ViewVenuePage() {
    const router = useRouter()
    const id = router.query.id as string
    const getEventQuery = api.venue.get.useQuery({ id }, { enabled: !!id })

    return (
        <RootLayout pageTitle="Jazz In Toronto | View Event">
            <Flex justify="center" px={{ initial: '5', xs: '0' }} py="9">
                {getEventQuery.data && <ViewVenue venue={getEventQuery.data} />}
                {getEventQuery.isLoading && <Loading />}
            </Flex>
        </RootLayout>
    )
}
