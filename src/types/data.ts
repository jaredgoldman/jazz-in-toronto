import { Prisma, Band, Venue, Event } from '@prisma/client'

export type EventWithBandVenue = Prisma.EventGetPayload<{
    include: { band: true; venue: true }
}>

export type Item = EventWithBandVenue | Band | Venue
export type Items = EventWithBandVenue[] | Band[] | Venue[] | []

// This type represents the data that is scraped from a venue's website
export type PartialEvent = Pick<
    Event,
    'startDate' | 'endDate' | 'name' | 'venueId'
>

export type { Band, Venue, Event }
