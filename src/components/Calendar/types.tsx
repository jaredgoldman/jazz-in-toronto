import { EventWithBandVenue } from "~/types/data"

export type DailyEventData = {
    events: Array<EventWithBandVenue> | []
    date: Date
}


