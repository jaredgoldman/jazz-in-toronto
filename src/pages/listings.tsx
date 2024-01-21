import { useState } from 'react'
import RootLayout from '~/layouts/RootLayout'
import RecurringGigs from '~/components/RecurringGigs'
import DailyListings from '~/components/DailyListings/DailyListings'
import Calendar from '~/components/Calendar'
import { Flex, Text, Button, Heading } from '@radix-ui/themes'
import Link from '~/components/Link'
import { EventsMap } from '~/components/EventsMap'
import addDays from 'date-fns/addDays'
import format from 'date-fns/format'

enum ListingType {
    CALENDAR = 'CALENDAR',
    DAILY_LISTINGS = 'DAILY_LISTINGS',
    EVENT_MAP = 'EVENT_MAP'
}

export default function Listings() {
    const [selectedDate, setSelectedDate] = useState(new Date())
    // Change listing type
    const [listingType, setListingType] = useState(ListingType.EVENT_MAP)
    const onChangeListingType = (type: ListingType) => setListingType(type)

    return (
        <RootLayout
            pageTitle="Jazz In Toronto | Event Listings"
            calloutContent={
                <Text>
                    Don’t see your gig listed in our below agenda and would like
                    to be added? Submit a{' '}
                    <Link href="/event">request to join our listings!</Link>
                </Text>
            }
        >
            <Flex
                width="100%"
                align="center"
                direction="column"
                px="6"
                py="9"
                mb="9"
            >
                <Flex direction="column" width="100%" className="max-w-[65rem]">
                    <Heading
                        size={{ initial: '8', xs: '9' }}
                        align={{ initial: 'center', xs: 'left' }}
                        mb="6"
                    >
                        Daily Listings
                    </Heading>
                    <Flex mb="5" gap="3">
                        <Button
                            onClick={() => {
                                setSelectedDate(addDays(selectedDate, -1))
                            }}
                        >
                            Previous Day
                        </Button>
                        <Button
                            onClick={() =>
                                setSelectedDate(addDays(selectedDate, 1))
                            }
                        >
                            Next Day
                        </Button>
                        <Button
                            variant="soft"
                            onClick={() =>
                                onChangeListingType(ListingType.CALENDAR)
                            }
                        >
                            View in Calendar
                        </Button>
                        <Button
                            variant="soft"
                            onClick={() =>
                                onChangeListingType(ListingType.DAILY_LISTINGS)
                            }
                        >
                            View Listings
                        </Button>
                        <Button
                            variant="soft"
                            onClick={() =>
                                onChangeListingType(ListingType.EVENT_MAP)
                            }
                        >
                            View Event Map
                        </Button>
                    </Flex>
                    <Heading
                        size={{ initial: '3', xs: '5' }}
                        align={{ initial: 'center', xs: 'left' }}
                        mb="5"
                    >{`Events on ${format(
                        selectedDate,
                        'EEEE, MMMM do, yyyy'
                    )} in Toronto, Ontario`}</Heading>
                </Flex>
                {listingType === ListingType.DAILY_LISTINGS && (
                    <Flex width="100%" className="max-w-[65rem]" mb="9">
                        <DailyListings selectedDate={selectedDate} />
                    </Flex>
                )}
                {listingType === ListingType.CALENDAR && (
                    <Flex width="100%" className="max-w-[65rem]" mb="9">
                        <Calendar
                            selectedDate={selectedDate}
                            setSelectedDate={setSelectedDate}
                        />
                    </Flex>
                )}
                {listingType === ListingType.EVENT_MAP && (
                    <Flex
                        width="100%"
                        className="h-[500px] max-w-[65rem]"
                        mb="9"
                    >
                        <EventsMap selectedDate={selectedDate} />
                    </Flex>
                )}
                <Flex width="100%" className="max-w-[65rem]" mb="9">
                    <RecurringGigs />
                </Flex>
            </Flex>
        </RootLayout>
    )
}
