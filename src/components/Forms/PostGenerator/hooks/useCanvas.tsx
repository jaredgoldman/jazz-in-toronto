import { type EventWithBandVenue } from '~/types/data'
import Canvas from '../components/canvas'

export default function useCanvas(
    events: EventWithBandVenue[] | undefined,
    date: Date,
    eventsPerCanvas = 19
) {
    const files: { [key: string]: File } = {}
    const canvases: JSX.Element[] = []
    const eventsCopy = events ? [...events] : []
    const canvasesNeeded = Math.ceil(eventsCopy.length / eventsPerCanvas)

    const getFile = async (
        file: File,
        currentIndex: number
    ): Promise<Blob | undefined> => {
        if (files[currentIndex]) return
        files[currentIndex] = file
    }

    for (let i = 0; i < canvasesNeeded; i++) {
        const canvasEvents = eventsCopy.splice(0, eventsPerCanvas)
        const canvas = (
            <Canvas
                events={canvasEvents}
                date={date}
                key={i}
                fileCallback={getFile}
                currentIndex={i}
            />
        )
        canvases.push(canvas)
    }

    return {
        canvases,
        files
    }
}
