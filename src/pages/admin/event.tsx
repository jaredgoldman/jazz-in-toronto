import EventForm from '~/components/Forms/Event'
import AdminLayout from '~/layouts/AdminLayout'
import { Flex } from '@radix-ui/themes'

export default function EditEvent() {
    return (
        <AdminLayout
            pageTitle="Jazz in Toronto | Edit Artist"
            breadcrumbs={{
                href: '/admin/events',
                title: 'Events',
                currentPageTitle: 'Edit Event'
            }}
        >
            <Flex justify="center" px={{ initial: '5', xs: '0' }} py="3">
                <EventForm />
            </Flex>
        </AdminLayout>
    )
}
