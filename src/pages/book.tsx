// Components
import RootLayout from '~/layouts/RootLayout'
import EventForm from '~/components/Forms/Event'
// Hooks
import useEventForm from '~/components/Forms/Event/hooks/useEventForm'

export default function Book(): JSX.Element {
    const eventFormProps = useEventForm()

    return (
        <RootLayout pageTitle="Jazz In Toronto | Book Your Event">
            <EventForm {...eventFormProps} />
        </RootLayout>
    )
}
