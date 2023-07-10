import { EventWithBandVenue, Band, Venue } from '~/types/data'
import { Item } from './types'

export const isSameDay = (date1: Date, date2: Date) => {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    )
}

export const isEvent = (item: Item | undefined): item is EventWithBandVenue => {
    return (item as EventWithBandVenue)?.startDate !== undefined
}

export const isBand = (item: Item | undefined): item is Band => {
    return (item as Band)?.genre !== undefined
}

export const isVenue = (item: Item | undefined): item is Venue => {
    return (item as Venue)?.address !== undefined
}

export const isType = (
    item: Item | undefined
): item is EventWithBandVenue | Band | Venue => {
    return isEvent(item) || isBand(item) || isVenue(item)
}
