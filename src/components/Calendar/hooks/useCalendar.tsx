import { useState, useEffect } from 'react'
import { addMonths, getDaysInMonth } from 'date-fns'
import { daysOfTheWeek } from '~/utils/constants'
import { api } from '~/utils/api'
import { DailyEventData } from '../types'
import { EventWithBandVenue } from '~/types/data'

interface ReturnType {
    changeMonth: (numOfMonths: number) => void
    currentMonthName: string
    currentDayName: string
    monthlyEvents: DailyEventData[]
    isLoading: boolean
}

export default function useCalendar(): ReturnType {
    const [selectedDate, setSelectedDate] = useState(new Date(Date.now()))
    const [monthlyEvents, setDailyEvents] = useState<DailyEventData[]>([])
    const currentYear = selectedDate.getFullYear()
    const currentMonthIndex = selectedDate.getMonth()
    const currentMonthName = months[currentMonthIndex] as string
    const currentDayName = daysOfTheWeek[selectedDate.getDay()]
    const daysInMonth: number = getDaysInMonth(selectedDate)

    const { data: monthlyEventsData, isLoading } =
        api.event.getAllByMonth.useQuery({
            year: currentYear,
            month: currentMonthIndex
        })

    useEffect(() => {
        if (monthlyEventsData?.length) {
            setDailyEvents(
                mapEventsToDays(
                    daysInMonth,
                    monthlyEventsData,
                    currentMonthIndex,
                    currentYear
                )
            )
        }
    }, [monthlyEventsData, daysInMonth, selectedDate])

    const changeMonth = (numOfMonths: number) => {
        setSelectedDate(addMonths(selectedDate, numOfMonths))
    }

    return {
        changeMonth,
        currentMonthName,
        currentDayName,
        monthlyEvents,
        isLoading
    }
}

const months = Array.from({ length: 12 }, (_, i) => {
    return new Date(0, i).toLocaleString('en-US', { month: 'long' })
})

// TODO: Optimize
const mapEventsToDays = (
    daysInMonth: number,
    monthlyEvents: EventWithBandVenue[],
    monthIndex: number,
    year: number
): DailyEventData[] => {
    const eventDays: { [key: number]: EventWithBandVenue[] | undefined } = {}
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
    return Array.from({ length: daysInMonth }, (_, i) => {
        const date = new Date(year, monthIndex, i + 1)
        return {
            events: eventDays[i + 1] || [],
            date
        }
    })
}
