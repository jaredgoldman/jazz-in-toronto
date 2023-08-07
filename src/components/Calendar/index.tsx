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
                            <td key={`${currentMonthName}-${i + 1}`}>
                                <CalendarDay dailyEvents={dailyEvents} />
                            </td>
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
        <main>
            <h1 className="text-center">{`Events in ${currentMonthName}, ${currentYear}`}</h1>
            <div className="flex w-full justify-center">
                <Button onClick={() => changeMonth(-1)}>Previous</Button>
                <Button onClick={() => changeMonth(1)}>Next</Button>
            </div>
            <div>
                {isLoading ? (
                    <Loading />
                ) : (
                    <table className="min-w-full rounded-md border border-gray-300 bg-white">
                        <thead className="bg-blue-500 text-white">
                            <tr>
                                {daysOfTheWeek.map((day) => (
                                    <td className="px-4 py-2 text-sm" key={day}>
                                        {day}
                                    </td>
                                ))}
                            </tr>
                        </thead>
                        <tbody>{eventRows}</tbody>
                    </table>
                )}
            </div>
        </main>
    )
}
