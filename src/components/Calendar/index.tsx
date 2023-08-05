import { useState } from 'react'
// Components
import Button from '../Button'
import CalendarDay from './components/CalendarDay'
// Hooks
import useCalendar from './hooks/useCalendar'
// Types
import { type DailyEventData } from './types'
// Utils
import { api } from '~/utils/api'

export default function Calendar(): JSX.Element {
    const [selectedDate, setSelectedDate] = useState(new Date())
    const currentYear = selectedDate.getFullYear()
    const currentMonth = selectedDate.getMonth()

    const { data: events, isLoading } = api.event.getAllByMonth.useQuery({
        year: currentYear,
        month: currentMonth
    })

    const { changeMonth, currentMonthName, monthlyEvents } = useCalendar(
        events,
        currentYear,
        currentMonth,
        selectedDate,
        setSelectedDate
    )

    const calendarDays = isLoading ? (
        <div>loading...</div>
    ) : (
        monthlyEvents?.map((dailyEvents: DailyEventData, i: number) => {
            return (
                <CalendarDay
                    key={`${currentMonthName}-${i + 1}`}
                    dailyEvents={dailyEvents}
                />
            )
        })
    )

    return (
        <main>
            <h1 className="text-center">{`Events in ${currentMonthName}`}</h1>
            <div className="flex w-full justify-center">
                <Button onClick={() => changeMonth(-1)}>Previous</Button>
                <Button onClick={() => changeMonth(1)}>Next</Button>
            </div>
            <div className="grid grid-cols-7 gap-x-1 gap-y-1">
                {calendarDays}
            </div>
        </main>
    )
}
