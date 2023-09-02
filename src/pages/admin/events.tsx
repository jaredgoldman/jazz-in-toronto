// Libraries
import { useState } from 'react'
// Cmponents
import AdminLayout from '~/layouts/AdminLayout'
import SearchContainer from '~/components/SearchContainer'
import PostGenerator from '~/components/Forms/PostGenerator'
import EventScraper from '~/components/Forms/EventScraper'
import { Button, Container, Flex } from '@radix-ui/themes'
import Loading from '~/components/Loading'
// Types
import { DataType } from '~/types/enums'
// Utils
import { api } from '~/utils/api'

enum View {
    Search = 'Search',
    Scrape = 'Scrape',
    Post = 'Post'
}

export default function AdminEvents(): JSX.Element {
    const [searchDate, setSearchDate] = useState<Date>(new Date())
    const [view, setView] = useState<View>(View.Search)

    const {
        data: events,
        isLoading: isLoadingEvents,
        refetch
    } = api.event.getAllByDay.useQuery({
        date: searchDate
    })
    const { data: venues, isLoading: isLoadingVenues } =
        api.venue.getAllCrawlable.useQuery()
    const { data: featuredItem, isLoading: featuredLoading } =
        api.event.getFeatured.useQuery()
    const { data: artists, isLoading: artistsLoading } =
        api.artist.getAll.useQuery()

    const isLoading =
        isLoadingEvents || isLoadingVenues || featuredLoading || artistsLoading

    const onEdit = async () => {
        await refetch()
    }

    return (
        <AdminLayout pageTitle="Jazz In Toronto | Admin - Events">
            <Flex mb="5" justify="center">
                <Button
                    mr="2"
                    onClick={() => setView(View.Search)}
                    disabled={view === View.Search}
                >
                    Search
                </Button>
                <Button
                    onClick={() => setView(View.Scrape)}
                    disabled={view === View.Scrape}
                >
                    Scrape
                </Button>
                <Button
                    ml="2"
                    onClick={() => setView(View.Post)}
                    disabled={view === View.Post}
                >
                    Post
                </Button>
            </Flex>
            <Container size="3">
                {view === View.Search && events && (
                    <SearchContainer
                        data={{ type: DataType.EVENT, items: events }}
                        heading="Find Events"
                        onEdit={onEdit}
                        featuredItem={featuredItem}
                        isLoading={isLoadingEvents}
                        searchDate={searchDate}
                        setSearchDate={setSearchDate}
                    />
                )}
                {view === View.Scrape && venues && artists && (
                    <EventScraper venues={venues} artists={artists} />
                )}
                {view === View.Post && <PostGenerator />}
                {isLoading && <Loading />}
            </Container>
        </AdminLayout>
    )
}
