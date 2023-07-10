import { EventWithBandVenue } from '~/types/data'
import { Item } from './types'
import { Band } from '~/types/data'

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
