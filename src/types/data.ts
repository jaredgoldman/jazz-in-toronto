import { Prisma, Artist, Venue, Event, Admin } from '@prisma/client'

export type EventWithArtistVenue = Prisma.EventGetPayload<{
    include: { artist: true; venue: true }
}>

export type Item = EventWithArtistVenue | Artist | Venue
export type Items = EventWithArtistVenue[] | Artist[] | Venue[] | []

export type { Artist, Venue, Event, Admin }
