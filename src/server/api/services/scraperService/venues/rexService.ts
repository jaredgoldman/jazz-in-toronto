import rexJson from '../templates/rex.json'
import { cheerioJsonMapper } from 'cheerio-json-mapper'
import { Venue, Event } from '~/types/data'
import { nonNullable } from '~/utils/typeguards'

interface RexEvents {
    monthAndYear: string
    events: {
        each: RexEvent[]
    }
}

interface RexEvent {
    date?: {
        day: string
        date: string
    }
    description?: {
        time: string
        name: string
    }
}

export default class RexService {
    private venue: Venue
    constructor(venue: Venue) {
        this.venue = venue
    }

    public async scrapeRexEvents(
        html: string
    ): Promise<Pick<Event, 'startDate' | 'endDate' | 'name' | 'venueId'>[]> {
        const { monthAndYear, events } = (await cheerioJsonMapper(
            html,
            rexJson
        )) as RexEvents

        if (monthAndYear.split(' ').length !== 2) {
            throw new Error('Error getting date headng')
        }

        // Process month and year
        const year = Number(monthAndYear.split(/\s+/)[1])
        const monthString = monthAndYear.split(/\s+/)[0]

        if (!year || !monthString) {
            throw new Error('Error processing current month and year')
        }

        // Find month number
        const month = new Date(`${monthString} 1 ${year}`).getMonth() + 1

        const eventData = events.each
            .map((event: RexEvent) => {
                if (event.date && event?.description) {
                    const time = event.description.time.split(/\s+/)[1]!
                    const hours = Number(time.split(':')[0])
                    const minutes = Number(time.split(':')[1])
                    const day = Number(event.date.date)
                    const startDate = new Date(year, month, day, hours, minutes)
                    const endDate = new Date(
                        year,
                        month,
                        day,
                        hours + 2,
                        minutes
                    )
                    return {
                        startDate,
                        endDate,
                        name: event.description.name,
                        venueId: this.venue.id
                    }
                }
            })
            .filter(nonNullable)

        return eventData
    }
}
