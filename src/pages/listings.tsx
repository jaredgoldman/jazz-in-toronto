import { useState } from 'react'
import RootLayout from '~/layouts/RootLayout'
import RecurringGigs from '~/components/RecurringGigs'
import DailyListings from '~/components/DailyListings/DailyListings'
import Calendar from '~/components/Calendar'
import { Callout } from '@radix-ui/themes'
import { InfoCircledIcon } from '@radix-ui/react-icons'
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
        <RootLayout pageTitle="Jazz In Toronto | Event Listings">
            <Callout.Root>
                <Callout.Icon>
                    <InfoCircledIcon />
                </Callout.Icon>
                <Callout.Text>
                    Don’t see your gig listed in our below agenda and would like
                    to be added? Submit a{' '}
                    <Link href="/event">request to join our listings!</Link>
                </Callout.Text>
            </Callout.Root>
            {listingType === ListingType.DAILY_LISTINGS ? (
                <DailyListings onChangeListingType={onChangeListingType} />
            ) : (
                <Calendar onChangeListingType={onChangeListingType} />
            )}
            <RecurringGigs />
        </RootLayout>
    )
}
