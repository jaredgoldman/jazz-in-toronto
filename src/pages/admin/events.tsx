// Libraries
import { useState } from 'react'
// Cmponents
import AdminLayout from '~/layouts/AdminLayout'
import SearchContainer from '~/components/SearchContainer'
import PostGenerator from '~/components/Forms/PostGenerator'
import EventScraper from '~/components/Forms/EventScraper'
import { Button, Container, Flex, Tabs } from '@radix-ui/themes'
import Loading from '~/components/Loading'
// Types
import { DataType } from '~/types/enums'
// Utils
import { api } from '~/utils/api'

enum View {
    Search = 'Search',
    Scrape = 'Scrape',
    Approval = 'Approval',
    Post = 'Post'
}

export default function AdminEvents(): JSX.Element {
    const [searchDate, setSearchDate] = useState<Date>(new Date())

    const {
        data: events,
        isLoading: isLoadingEvents,
        refetch
    } = api.event.getAllByDay.useQuery({
        date: searchDate
    })
    const { data: venues, isLoading: isLoadingVenues } =
        api.venue.getAllCrawlable.useQuery()
    const { data: artists, isLoading: artistsLoading } =
        api.artist.getAll.useQuery()
    const { data: unapproved, isLoading: isLoadingUnapproved } =
        api.event.getAllUnapproved.useQuery()

    const isLoading = isLoadingEvents || isLoadingVenues || artistsLoading

    const onEdit = async () => {
        await refetch()
    }

    return (
        <AdminLayout pageTitle="Jazz In Toronto | Admin - Events">
            <Tabs.Root defaultValue={View.Search}>
                <Tabs.List>
                    <Tabs.Trigger value={View.Search}>Search</Tabs.Trigger>
                    <Tabs.Trigger value={View.Approval}>Approval</Tabs.Trigger>
                    <Tabs.Trigger value={View.Scrape}>Scrape</Tabs.Trigger>
                    <Tabs.Trigger value={View.Post}>Post</Tabs.Trigger>
                </Tabs.List>
                <Container size="3">
                    <Tabs.Content value={View.Search}>
                        {events && (
                            <SearchContainer
                                data={{ type: DataType.EVENT, items: events }}
                                heading="Find Events"
                                onEdit={onEdit}
                                isLoading={isLoadingEvents}
                                searchDate={searchDate}
                                setSearchDate={setSearchDate}
                            />
                        )}
                    </Tabs.Content>
                    <Tabs.Content value={View.Approval}>
                        {unapproved && (
                            <SearchContainer
                                data={{
                                    type: DataType.EVENT,
                                    items: unapproved
                                }}
                                heading="Approve Events"
                                onEdit={onEdit}
                                isLoading={isLoadingUnapproved}
                                canEditFormState={true}
                            />
                        )}
                    </Tabs.Content>
                    <Tabs.Content value={View.Scrape}>
                        {venues && artists && (
                            <EventScraper venues={venues} artists={artists} />
                        )}
                    </Tabs.Content>
                    <Tabs.Content value={View.Post}>
                        <PostGenerator />
                    </Tabs.Content>
                    {isLoading && <Loading />}
                </Container>
            </Tabs.Root>
        </AdminLayout>
    )
}
