import type { EventWithArtistVenue, Venue, Artist } from '~/types/data'
import { type DataType } from '~/types/enums'

export enum SearchOption {
    Name = 'Name',
    Date = 'Date',
    Website = 'Website',
    InstagramHandle = 'InstagramHandle',
    Venue = 'Venue'
}

export type RowData =
    | { type: DataType.EVENT; item: EventWithArtistVenue }
    | { type: DataType.VENUE; item: Venue }
    | { type: DataType.ARTIST; item: Artist }

export type TableData =
    | { type: DataType.EVENT; items: EventWithArtistVenue[] }
    | { type: DataType.VENUE; items: Venue[] }
    | { type: DataType.ARTIST; items: Artist[] }
