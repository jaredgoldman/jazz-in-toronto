import { Prisma } from '@prisma/client'

export type EventWithBandVenue = Prisma.EventGetPayload<{
    include: { band: true; venue: true }
}>
