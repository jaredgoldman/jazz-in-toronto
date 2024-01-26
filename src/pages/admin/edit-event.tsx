import EventForm from '~/components/Forms/Event'
import AdminLayout from '~/layouts/AdminLayout'

export default function EditEvent() {
    return (
        <AdminLayout pageTitle="Jazz in Toronto | Edit Artist">
            <EventForm />
        </AdminLayout>
    )
}
