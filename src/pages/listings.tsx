// import { useCallback, useState, useMemo } from 'react'
import RootLayout from '~/layouts/RootLayout'
// import DailyListings from '~/components/DailyListings/'
// import Calendar from '~/components/Calendar'
import {
    Flex,
    Text,
    // Button,
    Heading
    // TextField
} from '@radix-ui/themes'
import Link from '~/components/Link'
// import { EventsMap } from '~/components/EventsMap'
// import { DateTime } from 'luxon'
// import { formatTime } from '~/utils'

// enum ListingType {
//     CALENDAR = 'CALENDAR',
//     DAILY_LISTINGS = 'DAILY_LISTINGS',
//     EVENT_MAP = 'EVENT_MAP'
// }

export default function Listings() {
    // const defaultDate = DateTime.now()
    //     .startOf('day')
    //     .setZone('America/New_York')
    //     .toJSDate()
    // const [selectedDate, setSelectedDate] = useState(defaultDate)
    // const [listingType, setListingType] = useState(ListingType.EVENT_MAP)
    // const onChangeListingType = (type: ListingType) => setListingType(type)
    // const listingTypeDuration = useMemo(
    // const listingTypeDurationString = useMemo(
    //     () => (listingType === ListingType.CALENDAR ? 'month' : 'day'),
    //     [listingType]
    // )

    /**
     * Function to handle the next day button
     * @returns void
     */
    // const handleNext = useCallback(
    //     () =>
    //         setSelectedDate(
    //             DateTime.fromJSDate(selectedDate)
    //                 .plus(listingTypeDuration)
    //                 .startOf('day')
    //                 .toJSDate()
    //         ),
    //     [selectedDate, listingTypeDuration]
    // )

    /**
     * Function to handle the previous day button
     * @returns void
     */
    // const handlePrevious = useCallback(
    //     () =>
    //         setSelectedDate(
    //             DateTime.fromJSDate(selectedDate)
    //                 .minus(listingTypeDuration)
    //                 .startOf('day')
    //                 .toJSDate()
    //         ),
    //     [selectedDate, listingTypeDuration]
    // )

    // const handleDatePickerChange = (date: string) => {
    //     setSelectedDate(DateTime.fromISO(date).startOf('day').toJSDate())
    // }

    // const headingDate = formatTime(selectedDate, 'EEEE, MMMM dd, yyyy')

    // const calendarHeadingDate = formatTime(selectedDate, 'MMMM yyyy')

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
            <Flex width="100%" align="center" direction="column" px="6" py="9">
                <Flex direction="column" width="100%" className="max-w-[65rem]">
                    <Heading
                        size={{ initial: '8', xs: '9' }}
                        align={{ initial: 'center', xs: 'left' }}
                        mb="6"
                    >
                        Daily Listings
                    </Heading>
                    <Flex
                        mb="5"
                        gap="3"
                        wrap="wrap"
                        justify={{ initial: 'center', xs: 'start' }}
                    >
                        <Heading>Listings will be back soon...</Heading>
                    </Flex>
                </Flex>
            </Flex>
        </RootLayout>
    )
}
