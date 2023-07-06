import { useState, useEffect } from "react"
import { addMonths, getDaysInMonth } from "date-fns"
import { api } from "~/utils/api"
import { Event } from "@prisma/client"
import { DailyEventData } from "../types"

interface ReturnType {
    changeMonth: (numOfMonths: number) => void
    currentMonthName: string
    monthlyEvents: any
    isLoading: boolean
}

export default function useCalendar(): ReturnType {
    const [selectedDate, setSelectedDate] = useState(new Date(Date.now()))
    const [monthlyEvents, setDailyEvents] = useState<DailyEventData>([])
    const currentYear = selectedDate.getFullYear()
    const currentMonthIndex = selectedDate.getMonth()
    const currentMonthName = months[currentMonthIndex] as string
    const daysInMonth: number = getDaysInMonth(selectedDate)

    const { data: monthlyEventsData, isLoading } =
        api.event.getAllByMonth.useQuery({
            year: currentYear,
            month: currentMonthIndex
        })

    useEffect(() => {
        if (monthlyEventsData?.length) {
            setDailyEvents(mapEventsToDays(daysInMonth, monthlyEventsData))
        }
    }, [monthlyEventsData, daysInMonth])

    const changeMonth = (numOfMonths: number) => {
        setSelectedDate(addMonths(selectedDate, numOfMonths))
    }

    return {
        changeMonth,
        currentMonthName,
        monthlyEvents,
        isLoading
    }
}

const months = Array.from({ length: 12 }, (_, i) => {
    return new Date(0, i).toLocaleString("en-US", { month: "long" })
})

const mapEventsToDays = (
    daysInMonth: number,
    monthlyEvents: Event[]
): DailyEventData => {
    const eventDays: { [key: number]: Event[] | undefined } = {}
    // Filter every event into a specific day
    monthlyEvents.forEach((event) => {
        const day = event.startDate.getDate()
        if (eventDays[day]) {
            eventDays[day]?.push(event)
        } else {
            eventDays[day] = [event]
        }
    })
    // add to array representing entire month
    return Array.from({ length: daysInMonth }, (_, i) => eventDays[i] || [])
}
