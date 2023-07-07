import Button from "../Button"
import CalendarDay from "./components/CalendarDay"
import useCalendar from "./hooks/useCalendar"
import { EventWithBand } from "./types"

export default function Calendar(): JSX.Element {
    const { changeMonth, currentMonthName, monthlyEvents, isLoading } =
        useCalendar()

    const calendarDays = isLoading ? (
        <div>loading...</div>
    ) : (
        monthlyEvents?.map((dailyEvents: EventWithBand[], i: number) => {
            return (
                <CalendarDay
                    key={`${currentMonthName}-${i + 1}`}
                    dayOfMonth={i + 1}
                    dailyEvents={dailyEvents}
                />
            )
        })
    )

    return (
        <main>
            <h1>{currentMonthName}</h1>
            <div>
                <Button onClick={() => changeMonth(-1)}>Previous</Button>
                <Button onClick={() => changeMonth(1)}>Next</Button>
            </div>
            <div>{calendarDays}</div>
        </main>
    )
}
