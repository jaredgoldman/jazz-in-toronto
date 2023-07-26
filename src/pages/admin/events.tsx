// Libraries
import { useState } from 'react'
// Cmponents
import AdminLayout from '~/layouts/AdminLayout'
import SearchContainer from '~/components/SearchContainer'
import PostGenerator from '~/components/Forms/PostGenerator'
import Button from '~/components/Button'
import EventScraper from '~/components/Forms/EventScraper'

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

    // Queries
    const { data: events, isLoading: isLoadingEvents } =
        api.event.getAllByDay.useQuery({
            date: searchDate
        })
    const { data: venues } = api.venue.getAll.useQuery()

    return (
        <AdminLayout>
            <>
                <div className="flex w-full justify-center">
                    <Button
                        onClick={() => setView(View.Search)}
                        disabled={view === View.Search}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => setView(View.Scrape)}
                        disabled={view === View.Scrape}
                    >
                        Crawl
                    </Button>
                    <Button
                        onClick={() => setView(View.Post)}
                        disabled={view === View.Post}
                    >
                        Post
                    </Button>
                </div>
                {view === View.Search && events && (
                    <SearchContainer
                        items={events}
                        isLoading={isLoadingEvents}
                        searchDate={searchDate}
                        setSearchDate={setSearchDate}
                    />
                )}
                {view === View.Scrape && venues && (
                    <EventScraper venues={venues} />
                )}
                {view === View.Post && <PostGenerator />}
            </>
        </AdminLayout>
    )
}
