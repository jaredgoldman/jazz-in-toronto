import { EventWithBandVenue } from '~/types/data'
import Canvas from '../components/canvas'

export default function useCanvas(
    events: EventWithBandVenue[] | undefined,
    date: Date,
    eventsPerCanvas = 19
) {
    const canvases: JSX.Element[] = []
    // while (events?.length) {
    if (events) {
        const canvasEvents = events.slice(0, eventsPerCanvas)
        const canvas = <Canvas events={canvasEvents} date={date} />
        canvases.push(canvas)
    }
    // }
    return canvases
}
