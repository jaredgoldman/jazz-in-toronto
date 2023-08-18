// Types
import {
    type EventWithArtistVenue,
    type Artist,
    type Venue
} from '~/types/data'

type Item = EventWithArtistVenue | Artist | Venue

export const isEvent = (
    item: Item | undefined
): item is EventWithArtistVenue => {
    return (
        (item as EventWithArtistVenue)?.startDate !== undefined &&
        (item as EventWithArtistVenue)?.endDate !== undefined &&
        (item as EventWithArtistVenue)?.artist !== undefined &&
        (item as EventWithArtistVenue)?.venue !== undefined
    )
}

export const isArtist = (item: Item | undefined): item is Artist => {
    return (item as Artist)?.genre !== undefined
}

export const isVenue = (item: Item | undefined): item is Venue => {
    return (item as Venue)?.address !== undefined
}

export const nonNullable = <T>(value: T): value is NonNullable<T> => {
    return value !== null && value !== undefined
}
