import { useCallback, useState, useMemo } from 'react'
import RootLayout from '~/layouts/RootLayout'
import DailyListings from '~/components/DailyListings/DailyListings'
import Calendar from '~/components/Calendar'
import { Flex, Text, Button, Heading, TextField } from '@radix-ui/themes'
import Link from '~/components/Link'
import { EventsMap } from '~/components/EventsMap'
import { formatInTimeZone } from 'date-fns-tz'
import { DateTime } from 'luxon'
import ReactDatePicker from 'react-datepicker'

enum ListingType {
    CALENDAR = 'CALENDAR',
    DAILY_LISTINGS = 'DAILY_LISTINGS',
    EVENT_MAP = 'EVENT_MAP'
}

export default function Listings() {
    const defaultDate = DateTime.now()
        .startOf('day')
        .setZone('America/New_York')
        .toJSDate()
    const [selectedDate, setSelectedDate] = useState(defaultDate)
    const [listingType, setListingType] = useState(ListingType.EVENT_MAP)
    const onChangeListingType = (type: ListingType) => setListingType(type)
    const listingTypeDuration = useMemo(
        () =>
            listingType === ListingType.CALENDAR ? { months: 1 } : { days: 1 },
        [listingType]
    )
    const listingTypeDurationString = useMemo(
        () => (listingType === ListingType.CALENDAR ? 'month' : 'day'),
        [listingType]
    )

    /**
     * Function to handle the next day button
     * @returns void
     */
    const handleNext = useCallback(
        () =>
            setSelectedDate(
                DateTime.fromJSDate(selectedDate)
                    .plus(listingTypeDuration)
                    .startOf('day')
                    .toJSDate()
            ),
        [selectedDate, listingTypeDuration]
    )

    /**
     * Function to handle the previous day button
     * @returns void
     */
    const handlePrevious = useCallback(
        () =>
            setSelectedDate(
                DateTime.fromJSDate(selectedDate)
                    .minus(listingTypeDuration)
                    .startOf('day')
                    .toJSDate()
            ),
        [selectedDate, listingTypeDuration]
    )

    const handleDatePickerChange = (date: string) => {
        setSelectedDate(DateTime.fromISO(date).startOf('day').toJSDate())
    }

    const headingDate = formatInTimeZone(
        selectedDate,
        'America/Toronto',
        'EEEE, MMMM do, yyyy'
    )

    const calendarHeadingDate = formatInTimeZone(
        selectedDate,
        'America/Toronto',
        'MMMM yyyy'
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
                    <Flex
                        mb="5"
                        gap="3"
                        wrap="wrap"
                        justify={{ initial: 'center', xs: 'start' }}
                    >
                        <Button
                            onClick={handlePrevious}
                        >{`Previous ${listingTypeDurationString}`}</Button>
                        <Button
                            onClick={handleNext}
                        >{`Next ${listingTypeDurationString}`}</Button>
                        <Button
                            variant="soft"
                            onClick={() =>
                                onChangeListingType(ListingType.CALENDAR)
                            }
                            disabled={listingType === ListingType.CALENDAR}
                        >
                            View in Calendar
                        </Button>
                        <Button
                            variant="soft"
                            onClick={() =>
                                onChangeListingType(ListingType.DAILY_LISTINGS)
                            }
                            disabled={
                                listingType === ListingType.DAILY_LISTINGS
                            }
                        >
                            View Listings
                        </Button>
                        <Button
                            variant="soft"
                            onClick={() =>
                                onChangeListingType(ListingType.EVENT_MAP)
                            }
                            disabled={listingType === ListingType.EVENT_MAP}
                        >
                            View Event Map
                        </Button>
                        <TextField.Root>
                            <TextField.Input
                                type="date"
                                value={
                                    new Date(selectedDate)
                                        .toISOString()
                                        .split('T')[0]
                                }
                                onChange={(e) =>
                                    handleDatePickerChange(e.target.value)
                                }
                                placeholder="Filter"
                            />
                        </TextField.Root>
                    </Flex>
                    {listingType !== ListingType.CALENDAR ? (
                        <Heading
                            size={{ initial: '3', xs: '5' }}
                            align={{ initial: 'center', xs: 'left' }}
                            mb="5"
                        >{`Events on ${headingDate} in Toronto, Ontario`}</Heading>
                    ) : (
                        <Heading
                            size={{ initial: '3', xs: '5' }}
                            align={{ initial: 'center', xs: 'left' }}
                            mb="5"
                        >
                            {`Events for ${calendarHeadingDate}`}
                        </Heading>
                    )}
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
                {/*<Flex width="100%" className="max-w-[65rem]" mb="9">
                    <RecurringGigs />
                </Flex>*/}
            </Flex>
        </RootLayout>
    )
}
