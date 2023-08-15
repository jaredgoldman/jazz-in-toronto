import { useState } from 'react'
// Components
import CalendarDay from './components/CalendarDay'
import { Flex, Button, Table, Heading } from '@radix-ui/themes'
// Hooks
import useCalendar from './hooks/useCalendar'
// Utils
import { api } from '~/utils/api'
import { getDaysOfTheWeek } from '~/utils/constants'
import Loading from '../Loading'

export default function Calendar(): JSX.Element {
    const [selectedDate, setSelectedDate] = useState(new Date())
    const currentYear = selectedDate.getFullYear()
    const currentMonth = selectedDate.getMonth()

    const {
        data: events,
        isLoading,
        refetch
    } = api.event.getAllByMonth.useQuery({
        year: currentYear,
        month: currentMonth
    })

    const { changeMonth, currentMonthName, monthlyEvents } = useCalendar(
        events,
        currentYear,
        currentMonth,
        selectedDate,
        setSelectedDate,
        refetch
    )

    const mapEventsToCalendarRows = () => {
        if (!monthlyEvents) return
        const monthlyEventsCopy = [...monthlyEvents]
        const rows = []
        // map events to calendar rows
        for (let i = 0; i < 5; i++) {
            const rowDays = monthlyEventsCopy.splice(0, 7)
            const calendarRowDays = (
                <Table.Row key={i}>
                    {rowDays.map((dailyEvents, i) => {
                        return (
                            <CalendarDay
                                key={`${currentMonthName} - ${i + 1}`}
                                dailyEvents={dailyEvents}
                            />
                        )
                    })}
                </Table.Row>
            )
            rows.push(calendarRowDays)
        }
        return rows
    }

    const eventRows = mapEventsToCalendarRows()

    return (
        <Flex direction="column" justify="center">
            <Heading
                align="center"
                mb="5"
            >{`Events on ${currentMonthName}, ${currentYear}`}</Heading>
            <Flex mb="5" justify="center">
                <Button mr="2" onClick={() => changeMonth(-1)}>
                    Previous
                </Button>
                <Button ml="2" onClick={() => changeMonth(1)}>
                    Next
                </Button>
            </Flex>
            {isLoading ? (
                <Loading />
            ) : (
                <Table.Root className="border-collapse">
                    <Table.Header>
                        <Table.Row>
                            {getDaysOfTheWeek('short').map((day) => (
                                <Table.Cell
                                    className="w-1/7 text-center"
                                    key={day}
                                    justify="center"
                                    width="7rem"
                                >
                                    {day}
                                </Table.Cell>
                            ))}
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>{eventRows}</Table.Body>
                </Table.Root>
            )}
        </Flex>
    )
}
