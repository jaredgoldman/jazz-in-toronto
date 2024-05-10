import { EventWithArtistVenue } from '~/types/data'

export interface DailyEventData {
// The key here will represent a venue name
    events: { [key: string]: EventWithArtistVenue[] }
    date: Date
    numOfEvents: number
    placeholder?: boolean
}
