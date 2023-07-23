import { Prisma, Band, Venue, Event } from '@prisma/client'

export type EventWithBandVenue = Prisma.EventGetPayload<{
    include: { band: true; venue: true }
}>

export type Item = EventWithBandVenue | Band | Venue
export type Items = EventWithBandVenue[] | Band[] | Venue[] | []

export type { Band, Venue, Event }
