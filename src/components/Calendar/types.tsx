import { type EventWithArtistVenue } from '~/types/data'

// The key here will represent a venue name
export interface DailyEventData {
    events: { [key: string]: EventWithArtistVenue[] }
    date: Date
    numOfEvents: number
    placeholder?: boolean
}
