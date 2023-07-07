import { Prisma } from "@prisma/client"

export type DailyEventData = {
    events: Array<EventWithBandVenue> | []
    date: Date
}

export type EventWithBandVenue = Prisma.EventGetPayload<{
    include: { band: true; venue: true }
}>
