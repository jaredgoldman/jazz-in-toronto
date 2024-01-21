import { useState } from 'react'
import RootLayout from '~/layouts/RootLayout'
import RecurringGigs from '~/components/RecurringGigs'
import DailyListings from '~/components/DailyListings/DailyListings'
import Calendar from '~/components/Calendar'
import { Flex, Text } from '@radix-ui/themes'
import Link from '~/components/Link'
import { EventsMap } from '~/components/EventsMap'

enum ListingType {
    CALENDAR = 'CALENDAR',
    DAILY_LISTINGS = 'DAILY_LISTINGS'
}

export default function Listings() {
    const [listingType, setListingType] = useState(ListingType.DAILY_LISTINGS)
    const onChangeListingType = () =>
        setListingType((prevListing) =>
            prevListing === ListingType.DAILY_LISTINGS
                ? ListingType.CALENDAR
                : ListingType.DAILY_LISTINGS
        )

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
                gap="9"
            >
                {listingType === ListingType.DAILY_LISTINGS ? (
                    <Flex width="100%" className="max-w-[65rem]">
                        <DailyListings
                            onChangeListingType={onChangeListingType}
                        />
                    </Flex>
                ) : (
                    <Flex width="100%" className="max-w-[65rem]">
                        <Calendar onChangeListingType={onChangeListingType} />
                    </Flex>
                )}
                <Flex width="100%" className="h-[400px] max-w-[65rem]">
                    <EventsMap />
                </Flex>
                <Flex width="100%" className="max-w-[65rem]">
                    <RecurringGigs />
                </Flex>
            </Flex>
        </RootLayout>
    )
}
