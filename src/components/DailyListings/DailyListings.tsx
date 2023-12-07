import { useState, useMemo } from 'react'
import { Button, Heading, Flex, Text, Box } from '@radix-ui/themes'
import Loading from '../Loading'
import { api } from '~/utils/api'
import { addDays, format } from 'date-fns'

interface Props {
    onChangeListingType: () => void
}
/**
 * Component to show daily listings in chronologcal order per day
 */
export default function DailyListings({ onChangeListingType }: Props) {
    const [selectedDate, setSelectedDate] = useState(new Date())

    const { data, isLoading } = api.event.getAllByDay.useQuery({
        date: selectedDate
    })

    const sorted = useMemo(
        () =>
            data?.length
                ? data.sort((a, b) => (a.startDate > b.startDate ? 1 : -1))
                : [],
        [data]
    )

    return (
        <Box p="5">
            <Heading size="9" mb="6">
                Daily Listings
            </Heading>
            <Flex mb="5" className="gap-3">
                <Button
                    onClick={() => {
                        setSelectedDate(addDays(selectedDate, -1))
                    }}
                >
                    Previous Day
                </Button>
                <Button
                    onClick={() => setSelectedDate(addDays(selectedDate, 1))}
                >
                    Next Day
                </Button>
                <Button variant="soft" onClick={onChangeListingType}>
                    View in Calendar
                </Button>
            </Flex>
            <Heading mb="5">{`Events on ${format(
                selectedDate,
                'EEEE, MMMM do, yyyy'
            )} in Toronto, Ontario`}</Heading>
            <Flex>
                {data?.length ? (
                    <Flex direction="column" className="gap-1">
                        {sorted.map((event) => {
                            const time = format(event.startDate, 'h:mm b')
                            const eventString = `${time} - ${event.artist.name} @ ${event.venue.name}`
                            return (
                                <Flex key={event.id}>
                                    <Text>{eventString}</Text>
                                </Flex>
                            )
                        })}
                    </Flex>
                ) : (
                    <>
                        {isLoading ? (
                            <Loading />
                        ) : (
                            <Text>No events scheduled for this day</Text>
                        )}
                    </>
                )}
            </Flex>
        </Box>
    )
}
