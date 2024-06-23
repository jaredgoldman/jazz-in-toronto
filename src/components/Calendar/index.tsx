import CalendarDay from './components/CalendarDay'
import { Flex, Table } from '@radix-ui/themes'
import Loading from '../Loading'
import useCalendar from './hooks/useCalendar'
import { api } from '~/utils/api'
import { getDaysOfTheWeek } from '~/utils/constants'

export type Props = {
    setSelectedDate: (date: Date) => void
    selectedDate: Date
}

export default function Calendar({ selectedDate }: Props) {
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

    const { currentMonthName, monthlyEvents } = useCalendar(
        events,
        currentYear,
        currentMonth,
        selectedDate,
        refetch
    )

    // Map calendar events to 5 x 7 grid
    const mapEventsToCalendarRows = () => {
        if (!monthlyEvents) return
        const monthlyEventsCopy = [...monthlyEvents]
        const rows = []
        const weeksInMonth = Math.ceil(monthlyEventsCopy.length / 7)
        // map events to calendar rows
        for (let i = 0; i < weeksInMonth; i++) {
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

    return (
        <Flex direction="column" justify="center" width="100%">
            {isLoading ? (
                <Loading />
            ) : (
                <Table.Root>
                    <Table.Header>
                        <Table.Row>
                            {getDaysOfTheWeek('short').map((day) => (
                                <Table.Cell key={day}>{day}</Table.Cell>
                            ))}
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>{mapEventsToCalendarRows()}</Table.Body>
                </Table.Root>
            )}
        </Flex>
    )
}
