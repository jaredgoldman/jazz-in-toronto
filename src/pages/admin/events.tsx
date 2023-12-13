// Cmponents
import AdminLayout from '~/layouts/AdminLayout'
import PostGenerator from '~/components/Forms/PostGenerator'
import EventScraper from '~/components/Forms/EventScraper'
import { Container, Tabs } from '@radix-ui/themes'
import SearchApproveEvents from '~/components/SearchApproveEvents'
import SearchEvents from '~/components/SearchEvents'
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
            <Tabs.Root defaultValue={View.Search}>
                <Tabs.List>
                    <Tabs.Trigger value={View.Search}>Search</Tabs.Trigger>
                    <Tabs.Trigger value={View.Approval}>Approval</Tabs.Trigger>
                    <Tabs.Trigger value={View.Scrape}>Scrape</Tabs.Trigger>
                    <Tabs.Trigger value={View.Post}>Post</Tabs.Trigger>
                </Tabs.List>
                <Container size="3">
                    <Tabs.Content value={View.Search}>
                      <EventsTable/>
                    </Tabs.Content>
                    <Tabs.Content value={View.Approval}>
                        <SearchApproveEvents />
                    </Tabs.Content>
                    <Tabs.Content value={View.Scrape}>
                        <EventScraper />
                    </Tabs.Content>
                    <Tabs.Content value={View.Post}>
                        <PostGenerator />
                    </Tabs.Content>
                </Container>
            </Tabs.Root>
        </AdminLayout>
    )
}
