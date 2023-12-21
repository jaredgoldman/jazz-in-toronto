export interface VenueEvents<T> {
    monthAndYear: string
    monthlyEvents: {
        dailyEvents: T[]
    }
}

export interface RexEvent {
    date: {
        day: string
        date: string
    }
    sets: {
        each: [
            {
                name: string
                time: string
            }
        ]
    }
}
