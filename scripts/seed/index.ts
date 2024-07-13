import { generateAdmin } from './utils'
import { prisma } from '~/server/db'
import venus from './data/venues.json'

export const seed = async () => {
    await generateAdmin()
    await prisma.venue.createMany({ data: venus })
}
