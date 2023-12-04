import { useState } from 'react'
import RootLayout from '~/layouts/RootLayout'
import RecurringGigs from '~/components/RecurringGigs'
import DailyListings from '~/components/DailyListings/DailyListings'
import Calendar from '~/components/Calendar'
import { Callout, Separator } from '@radix-ui/themes'
import { InfoCircledIcon } from '@radix-ui/react-icons'

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
        >
            <Callout.Root >
                <Callout.Icon>
                    <InfoCircledIcon />
                </Callout.Icon>
                <Callout.Text>
                    Don’t see your gig listed in our below agenda and would like
                    to be added? Submit a request to join our listings!
                </Callout.Text>
            </Callout.Root>
            {listingType === ListingType.DAILY_LISTINGS ? (
                <DailyListings onChangeListingType={onChangeListingType} />
            ) : (
                <Calendar onChangeListingType={onChangeListingType} />
            )}
            <Separator size="4" className="my-10"/>
            <RecurringGigs />
        </RootLayout>
    )
}
