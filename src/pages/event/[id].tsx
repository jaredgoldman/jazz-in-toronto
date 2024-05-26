import { useRouter } from 'next/router'
import { Flex } from '@radix-ui/themes'
import RootLayout from '~/layouts/RootLayout'
import { api } from '~/utils/api'
import ViewEvent from '~/components/ViewEvent'
import Loading from '~/components/Loading'

export default function ViewEventPAge() {
    const router = useRouter()
    const id = router.query.id as string
    const getEventQuery = api.event.get.useQuery({ id }, { enabled: !!id })

    return (
        <RootLayout pageTitle="Jazz In Toronto | View Event">
            <Flex justify="center" px={{ initial: '5', xs: '0' }} py="9">
                {getEventQuery.data && <ViewEvent event={getEventQuery.data} />}
                {getEventQuery.isLoading && <Loading />}
            </Flex>
        </RootLayout>
    )
}
