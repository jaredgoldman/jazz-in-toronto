// Types
import { type EventWithBandVenue, type Band, type Venue } from '~/types/data'

type Item = EventWithBandVenue | Band | Venue

export const isEvent = (item: Item | undefined): item is EventWithBandVenue => {
    return (
        (item as EventWithBandVenue)?.startDate !== undefined &&
        (item as EventWithBandVenue)?.endDate !== undefined &&
        (item as EventWithBandVenue)?.band !== undefined &&
        (item as EventWithBandVenue)?.venue !== undefined
    )
}

export const isBand = (item: Item | undefined): item is Band => {
    return (item as Band)?.genre !== undefined
}

export const isVenue = (item: Item | undefined): item is Venue => {
    return (item as Venue)?.address !== undefined
}

export const nonNullable = <T>(value: T): value is NonNullable<T> => {
    return value !== null && value !== undefined
}
