// Components
import RootLayout from '~/layouts/RootLayout'
import EventForm from '~/components/Forms/Event'
// Hooks
import useEventForm from '~/components/Forms/Event/hooks/useEventForm'
import { Heading } from '@radix-ui/themes'

export default function Book(): JSX.Element {
    const eventFormProps = useEventForm()

    return (
        <RootLayout pageTitle="Jazz In Toronto | Book Your Event">
            <Heading align="center" size="8" mb="6">
                Book Your Gig
            </Heading>
            <EventForm {...eventFormProps} />
        </RootLayout>
    )
}
