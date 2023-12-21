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

export type { Artist, Venue, Event, Admin }

export interface FileData {
    file: File
    dataURL: string
}
