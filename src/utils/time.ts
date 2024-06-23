import { DateTime } from 'luxon'

/**
 * Format js Date for FE
 */
export const formatTime = (time: Date, format = 'h:mm a') => {
    return DateTime.fromJSDate(time).setZone('America/Toronto').toFormat(format)
}
