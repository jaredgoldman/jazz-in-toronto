import { formatInTimeZone } from 'date-fns-tz'

/**
 * Format js Date for FE
 */
export const formatTime = (time: Date, format = 'h:mm a') => {
  console.log(time)
    return formatInTimeZone(time, 'America/Toronto', format)
}
