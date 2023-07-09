import { Venue, Band } from '@prisma/client'
import { EventWithBandVenue } from '~/types/data'

interface Props {
    items: Venue[] | Band[] | EventWithBandVenue[] | undefined
}

export default function SearchTable({ props }: Props): JSX.Element {}
