import { useState } from 'react'
// Components
import Button from '../Button'
import CalendarDay from './components/CalendarDay'
import Container from '../Container'
// Hooks
import useCalendar from './hooks/useCalendar'
// Types
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
                <tr key={i}>
                    {rowDays.map((dailyEvents, i) => {
                        return (
                            <CalendarDay
                                key={`${currentMonthName} - ${i + 1}`}
                                dailyEvents={dailyEvents}
                            />
                        )
                    })}
                </tr>
            )
            rows.push(calendarRowDays)
        }
        return rows
    }

    const eventRows = mapEventsToCalendarRows()

    return (
        <Container justify="center">
            <div className="overflow-x-auto">
                {isLoading ? (
                    <Loading />
                ) : (
                    <>
                        <h1 className="text-center">{`Events on ${currentMonthName}, ${currentYear}`}</h1>
                        <div className="my-8 flex w-full min-w-[20rem] justify-evenly">
                            <Button onClick={() => changeMonth(-1)}>
                                Previous
                            </Button>
                            <Button onClick={() => changeMonth(1)}>Next</Button>
                        </div>
                        <table className="min-w-max border-collapse">
                            <thead className="border-b-2 border-white text-white">
                                <tr>
                                    {getDaysOfTheWeek('short').map((day) => (
                                        <td
                                            className="w-1/7 text-center"
                                            key={day}
                                        >
                                            {day}
                                        </td>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>{eventRows}</tbody>
                        </table>
                    </>
                )}
            </div>
        </Container>
    )
}
