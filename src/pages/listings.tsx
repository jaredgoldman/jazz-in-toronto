import { useState } from 'react'
import RootLayout from '~/layouts/RootLayout'
import RecurringGigs from '~/components/RecurringGigs'
import DailyListings from '~/components/DailyListings/DailyListings'
import Calendar from '~/components/Calendar'
import { Flex, Text } from '@radix-ui/themes'
import Link from '~/components/Link'

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
            <Flex width="100%" justify="center">
                <Flex
                    direction="column"
                    p="6"
                    gap="6"
                    mb="6"
                    className="max-w-[75rem]"
                >
                    {listingType === ListingType.DAILY_LISTINGS ? (
                        <DailyListings
                            onChangeListingType={onChangeListingType}
                        />
                    ) : (
                        <Calendar onChangeListingType={onChangeListingType} />
                    )}
                    <RecurringGigs />
                </Flex>
            </Flex>
        </RootLayout>
    )
}
