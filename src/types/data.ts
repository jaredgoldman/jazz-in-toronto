import {
    type Prisma,
    type Artist,
    type Venue,
    type Event,
    type Admin
} from '@prisma/client'

export type EventWithArtistVenue = Prisma.EventGetPayload<{
    include: { artist: true; venue: true }
}>

export type Item = EventWithArtistVenue | Artist | Venue
export type Items = EventWithArtistVenue[] | Artist[] | Venue[] | []

// This type represents the data that is scraped from a venue's website
export type PartialEvent = Pick<
    Event,
    'startDate' | 'endDate' | 'name' | 'venueId'
>

export type { Artist, Venue, Event, Admin }

export interface FileData {
    file: File
    dataURL: string
}
