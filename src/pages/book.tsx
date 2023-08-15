// Components
import RootLayout from '~/layouts/RootLayout'
import EventForm from '~/components/Forms/Event'

export default function Book(): JSX.Element {
    return (
        <RootLayout pageTitle="Jazz In Toronto | Book Your Event">
            <EventForm />
        </RootLayout>
    )
}
