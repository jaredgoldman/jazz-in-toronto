import EventForm from '~/components/Forms/Event'
import { useEffect } from 'react'
import RootLayout from '~/layouts/RootLayout'
import { useRouter } from 'next/router'
import { api } from '~/utils/api'
import useEventForm from '~/components/Forms/Event/hooks/useEventForm'

export default function EditEvent() {
    const router = useRouter()
    const param = router.query.id as string
    const { data } = api.event.get.useQuery({ id: param })
    const eventFormProps = useEventForm(data)

    useEffect(() => {
        if (
            data &&
            JSON.stringify(data) !== JSON.stringify(eventFormProps.getValues())
        ) {
            eventFormProps.reset(data)
        }
    }, [data, eventFormProps])

    return (
        <RootLayout pageTitle="Jazz in Toronto | Edit Artist">
            <EventForm {...eventFormProps} />
        </RootLayout>
    )
}
