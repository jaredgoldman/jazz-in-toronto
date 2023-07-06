import { Event } from "@prisma/client"

export type DailyEventData = Array<Array<Event> | []>
