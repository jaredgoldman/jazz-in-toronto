import Button from "../Button"
import CalendarDay from "./components/CalendarDay"
import useCalendar from "./hooks/useCalendar"
import { DailyEventData } from "./types"

export default function Calendar(): JSX.Element {
    const { changeMonth, currentMonthName, monthlyEvents, isLoading } =
        useCalendar()

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
            <div className="grid grid-cols-7">{calendarDays}</div>
        </main>
    )
}
