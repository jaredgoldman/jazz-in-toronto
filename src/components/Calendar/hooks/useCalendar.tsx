// Libraries
import { useState, useEffect } from 'react'
import { addMonths, getDaysInMonth } from 'date-fns'
// Types
import { type DailyEventData } from '../types'
import { type EventWithBandVenue } from '~/types/data'
import { type QueryObserverResult } from '@tanstack/react-query'
// Utils
import { getDaysOfTheWeek } from '~/utils/constants'

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
    setSelectedDate: (date: Date) => void,
    refetch?: () => Promise<QueryObserverResult<EventWithBandVenue[]>>
): ReturnType {
    const [monthlyEvents, setDailyEvents] = useState<DailyEventData[]>([])

    const currentMonthName = months[currentMonth] as string
    const currentDayName = getDaysOfTheWeek('long')[
        selectedDate.getDay()
    ] as string
    const daysInMonth = getDaysInMonth(selectedDate)

    useEffect(() => {
        if (events?.length) {
            const dailyEvents = mapEventsToDaysAndVenue(
                daysInMonth,
                events,
                currentMonth,
                currentYear
            )
            const { before, after } = getWeekDaysOutsideOfMonth(
                currentMonth,
                currentYear
            )
            setDailyEvents([...before, ...dailyEvents, ...after])
        }
    }, [events, daysInMonth, selectedDate, currentMonth, currentYear])

    useEffect(() => {
        const handleRetch = async () => {
            if (refetch) {
                await refetch()
            }
        }
        void handleRetch()
    }, [refetch, selectedDate])

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

// TODO: Optimize or maybe move to backend?
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
        // Day esists in dailyEvents
        if (dailyEvents[day]) {
            // does venue? if so, push event to array
            if (dailyEvents[day]!.events[event.venue.name]) {
                dailyEvents[day]!.events[event.venue.name]!.push(event)
                dailyEvents[day]!.numOfEvents += 1
            } else {
                // else, create venue and add event to array
                dailyEvents[day]!.events[event.venue.name] = [event]
                dailyEvents[day]!.numOfEvents += 1
            }
        } else {
            // else, create day and venue and add event to array
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

const getWeekDaysOutsideOfMonth = (
    monthIndex: number,
    year: number
): { before: DailyEventData[]; after: DailyEventData[] } => {
    // Find the first and last day of the month
    const firstDayOfMonth = new Date(year, monthIndex, 1)
    const lastDayOfMonth = new Date(year, monthIndex + 1, 0) // 0th day of the next month is the last day of the current month

    const daysBefore: Date[] = []
    const daysAfter: Date[] = []

    // Get the preceding days that are part of the same week
    for (let i = 1; i <= firstDayOfMonth.getDay(); i++) {
        daysBefore.unshift(new Date(year, monthIndex, 1 - i))
    }

    // Get the following days that are part of the same week
    for (let i = 1; i < 7 - lastDayOfMonth.getDay(); i++) {
        daysAfter.push(new Date(year, monthIndex + 1, i))
    }

    const before = daysBefore.map((date) => {
        return {
            events: {},
            date,
            numOfEvents: 0,
            placeholder: true
        }
    })

    const after = daysAfter.map((date) => {
        return {
            events: {},
            date,
            numOfEvents: 0,
            placeholder: true
        }
    })

    return { before, after }
}
