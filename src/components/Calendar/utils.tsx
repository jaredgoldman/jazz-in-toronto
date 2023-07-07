export const nthNumber = (number: number) => {
    if (number > 3 && number < 21) return number + "th"
    let ordinal
    switch (number % 10) {
        case 1:
            ordinal = "st"
            break
        case 2:
            ordinal = "nd"
            break
        case 3:
            ordinal = "rd"
            break
        default:
            ordinal = "th"
    }
    return number + ordinal
}
