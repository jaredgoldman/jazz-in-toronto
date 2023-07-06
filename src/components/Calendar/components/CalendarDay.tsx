import { Event } from "@prisma/client"

interface Props {
    dayOfMonth: number
    dailyEvents: Event[] | []
}

export default function CalendarDay({ dayOfMonth, dailyEvents }: Props) {
    return (
        <div>
            <div>{nthNumber(dayOfMonth)}</div>
            <div>{`${dailyEvents.length} events`}</div>
        </div>
    )
}

const nthNumber = (number: number) => {
    if (number > 3 && number < 21) return "th"
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
