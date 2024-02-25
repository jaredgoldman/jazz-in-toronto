import { DateTime } from 'luxon'

export const getFormattedTime = (date: Date) => {
    return date.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    })
}

export const nthNumber = (number: number) => {
    if (number > 3 && number < 21) return `${number}th`
    let ordinal
    switch (number % 10) {
        case 1:
            ordinal = 'st'
            break
        case 2:
            ordinal = 'nd'
            break
        case 3:
            ordinal = 'rd'
            break
        default:
            ordinal = 'th'
    }
    return `${number}${ordinal}`
}

export const getShortDate = (date: Date) => {
    const formattedDate = date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    })
    const suffix = nthNumber(date.getDate())
    return `${formattedDate} ${suffix}`
}

export const isSameDay = (date1: Date, date2: Date) => {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    )
}

export const convertTo12Hour = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':')
    if (hours && minutes) {
        const suffix = +hours >= 12 ? 'PM' : 'AM'
        const hour12 = +hours % 12 || 12
        return `${String(hour12).padStart(2, '0')}:${minutes} ${suffix}`
    }
}

/*
 * Convert Strapi-generated time string to JS date of today
 */
export const convertAndFormatTime = (timeString: string) => {
    // Get the current date.
    const currentDate = new Date()

    // Extract hours, minutes, and seconds from the time string.
    const [hours, minutes] = timeString.split(':')

    if (hours && minutes) {
        // Set the time on the current date.
        currentDate.setHours(+hours, +minutes, 0, 0)

        // Format the time into 12-hour format.
        let hours12 = currentDate.getHours()
        let period = 'AM'
        if (hours12 >= 12) {
            period = 'PM'
            hours12 = hours12 > 12 ? hours12 - 12 : hours12
        } else {
            hours12 = hours12 === 0 ? 12 : hours12
        }

        // Ensure minutes and seconds are 2 digits.
        const printMinutes = String(currentDate.getMinutes()).padStart(2, '0')

        return `${hours12}:${printMinutes} ${period}`
    }
    throw new Error('invalid time')
}

// Ensure that we're always using EST dates
// XXX: Hacky solution at best, sould reconsider time handling
export const getDateEST = (date: Date) => {
    const dateISO = new Date(date).toISOString().slice(0, 10)
    return DateTime.fromISO(dateISO).setZone('America/New_York').toJSDate()
}
