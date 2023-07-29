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
