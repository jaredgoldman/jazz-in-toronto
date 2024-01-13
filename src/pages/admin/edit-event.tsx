import EventForm from '~/components/Forms/Event'
import RootLayout from '~/layouts/RootLayout'

export default function EditEvent() {
    return (
        <RootLayout pageTitle="Jazz in Toronto | Edit Artist">
            <EventForm />
        </RootLayout>
    )
}
