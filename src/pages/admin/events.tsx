// Cmponents
import AdminLayout from '~/layouts/AdminLayout'
import PostGenerator from '~/components/Forms/PostGenerator'
import EventScraper from '~/components/Forms/EventScraper'
import { Container, Tabs } from '@radix-ui/themes'
import SearchApproveEvents from '~/components/SearchApproveEvents'
import { Heading } from '@radix-ui/themes'
import { EventsTable } from '~/components/Tables/Events'

enum View {
    Search = 'Search',
    Scrape = 'Scrape',
    Approval = 'Approval',
    Post = 'Post'
}

export default function AdminEvents(): JSX.Element {
    return (
        <AdminLayout pageTitle="Jazz In Toronto | Admin - Events">
            <Heading align="center" size="9" mb="9">
                Events
            </Heading>
            <EventsTable />
        </AdminLayout>
    )
}
