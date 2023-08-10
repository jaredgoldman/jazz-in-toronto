import { useState } from 'react'
// Components
import Button from '../Button'
import CalendarDay from './components/CalendarDay'
// Hooks
import useCalendar from './hooks/useCalendar'
// Types
// Utils
import { api } from '~/utils/api'
import { daysOfTheWeek } from '~/utils/constants'
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
                <tr className="text-center text-gray-900" key={i}>
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
        <main className="flex flex-col items-center">
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <h1 className="text-center">{`Events on ${currentMonthName}, ${currentYear}`}</h1>
                    <div className="my-8 flex w-1/2 justify-evenly">
                        {' '}
                        <Button onClick={() => changeMonth(-1)}>
                            Previous
                        </Button>
                        <Button onClick={() => changeMonth(1)}>Next</Button>
                    </div>
                    <div>
                        <table className="mb-14 min-w-full border-collapse">
                            <thead className="border-shite border-b-2 text-white">
                                <tr>
                                    {daysOfTheWeek.map((day) => (
                                        <td
                                            className="px-5 py-2 text-center text-sm"
                                            key={day}
                                        >
                                            {day}
                                        </td>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>{eventRows}</tbody>
                        </table>
                    </div>
                </>
            )}
        </main>
    )
}
