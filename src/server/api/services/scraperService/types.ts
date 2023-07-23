export interface VenueEvents<T> {
    monthAndYear: string
    events: {
        each: T[]
    }
}

export interface RexEvent {
    date: {
        day: string
        date: string
    }
    description: {
        name: string
        time: string
    }
}
