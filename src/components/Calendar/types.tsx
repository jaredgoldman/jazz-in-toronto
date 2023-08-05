import { type EventWithBandVenue } from '~/types/data'

// The key here will represent a venue name
export interface DailyEventData {
    events: { [key: string]: EventWithBandVenue[] }
    date: Date
    numOfEvents: number
}
