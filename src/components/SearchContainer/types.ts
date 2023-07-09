import { Venue, Band } from '@prisma/client'
import { EventWithBandVenue } from '~/types/data'

export enum SearchOption {
    Name = 'Name',
    Date = 'Date',
    Website = 'Website',
    InstagramHandle = 'InstagramHandle'
}

export type Item = Venue | Band | EventWithBandVenue
