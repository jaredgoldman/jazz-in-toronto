import { Prisma, Band, Venue } from '@prisma/client'

export type EventWithBandVenue = Prisma.EventGetPayload<{
    include: { band: true; venue: true }
}>

export type { Band, Venue }
