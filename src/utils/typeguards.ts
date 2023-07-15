import { EventWithBandVenue, Band, Venue } from '~/types/data'

type Item = EventWithBandVenue | Band | Venue

export const isEvent = (item: Item | undefined): item is EventWithBandVenue => {
    return (item as EventWithBandVenue)?.startDate !== undefined
}

export const isBand = (item: Item | undefined): item is Band => {
    return (item as Band)?.genre !== undefined
}

export const isVenue = (item: Item | undefined): item is Venue => {
    return (item as Venue)?.address !== undefined
}
