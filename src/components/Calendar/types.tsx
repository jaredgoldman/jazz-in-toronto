import { Event } from "@prisma/client"
import { Prisma } from "@prisma/client"

export type DailyEventData = Array<Array<EventWithBandVenue> | []>

export type EventWithBandVenue = Prisma.EventGetPayload<{
    include: { band: true; venue: true }
}>
