// Libraries
import { useState, useEffect } from 'react'
import { addMonths, getDaysInMonth } from 'date-fns'
// Types
import { type DailyEventData } from '../types'
import { type EventWithBandVenue } from '~/types/data'
// Utils
import { daysOfTheWeek } from '~/utils/constants'

interface ReturnType {
    changeMonth: (numOfMonths: number) => void
    currentMonthName: string
    currentDayName: string
    monthlyEvents: DailyEventData[]
}

export default function useCalendar(
    events: EventWithBandVenue[] | undefined,
    currentYear: number,
    currentMonth: number,
    selectedDate: Date,
    setSelectedDate: (date: Date) => void
): ReturnType {
    const [monthlyEvents, setDailyEvents] = useState<DailyEventData[]>([])

    const currentMonthName = months[currentMonth] as string
    const currentDayName = daysOfTheWeek[selectedDate.getDay()] as string
    const daysInMonth = getDaysInMonth(selectedDate)

    useEffect(() => {
        if (events?.length) {
            setDailyEvents(
                mapEventsToDaysAndVenue(
                    daysInMonth,
                    events,
                    currentMonth,
                    currentYear
                )
            )
        }
    }, [events, daysInMonth, selectedDate, currentMonth, currentYear])

    const changeMonth = (numOfMonths: number) => {
        setSelectedDate(addMonths(selectedDate, numOfMonths))
    }

    return {
        changeMonth,
        currentMonthName,
        currentDayName,
        monthlyEvents
    }
}

const months = Array.from({ length: 12 }, (_, i) => {
    return new Date(0, i).toLocaleString('en-US', { month: 'long' })
})

// TODO: Optimize
const mapEventsToDaysAndVenue = (
    daysInMonth: number,
    monthlyEvents: EventWithBandVenue[],
    monthIndex: number,
    year: number
): DailyEventData[] => {
    const dailyEvents: {
        [key: number]: {
            events: { [key: string]: EventWithBandVenue[] }
            numOfEvents: number
        }
    } = {}
    // Filter every event into a specific day and venue
    monthlyEvents.forEach((event) => {
        const day = event.startDate.getDate()
        if (dailyEvents[day]) {
            if (dailyEvents[day]!.events[event.venue.name]) {
                dailyEvents[day]!.events[event.venue.name]!.push(event)
                dailyEvents[day]!.numOfEvents! += 1
            } else {
                dailyEvents[day]!.events[event.venue.name] = [event]
                dailyEvents[day]!.numOfEvents! += 1
            }
        } else {
            dailyEvents[day] = { events: {}, numOfEvents: 1 }
            dailyEvents[day]!.events[event.venue.name] = [event]
        }
    })

    // add to array representing the entire month
    return Array.from({ length: daysInMonth }, (_, i) => {
        const date = new Date(year, monthIndex, i + 1)
        const dayData = dailyEvents[i + 1] || { events: {}, numOfEvents: 0 }
        return {
            events: dayData.events,
            date,
            numOfEvents: dayData.numOfEvents
        }
    })
}
