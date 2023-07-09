import { EventWithBandVenue } from '~/types/data'
import { Item } from './types'

export const isSameDay = (date1: Date, date2: Date) => {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    )
}

export const isEvent = (item: Item): item is EventWithBandVenue => {
    return (item as EventWithBandVenue).startDate !== undefined
}
