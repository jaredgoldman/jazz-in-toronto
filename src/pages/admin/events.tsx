import { useState } from 'react'
import AdminLayout from '~/layouts/AdminLayout'
import SearchContainer from '~/components/SearchContainer'
import { api } from '~/utils/api'
import Button from '~/components/Button'
import EventScraper from '~/components/EventScraper'

export default function AdminEvents(): JSX.Element {
    const [searchDate, setSearchDate] = useState<Date>(new Date())
    const [crawl, setCrawl] = useState<boolean>(false)

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
                    <Button onClick={() => setCrawl(false)} disabled={!crawl}>
                        Search
                    </Button>
                    <Button onClick={() => setCrawl(true)} disabled={crawl}>
                        Crawl
                    </Button>
                </div>
                {crawl && venues && <EventScraper venues={venues} />}
                {!crawl && events && (
                    <SearchContainer
                        items={events}
                        isLoading={isLoadingEvents}
                        searchDate={searchDate}
                        setSearchDate={setSearchDate}
                    />
                )}
            </>
        </AdminLayout>
    )
}
