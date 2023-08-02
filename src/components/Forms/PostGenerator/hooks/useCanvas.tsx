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
    let currentIndex = 0

    const getBlob = async (
        canvas: HTMLCanvasElement | null,
        currentIndex: number
    ): Promise<Blob | undefined> => {
        if (files[currentIndex] || !canvas) return
        const dataURL = canvas.toDataURL('image/png')
        const blob = await (await fetch(dataURL)).blob()
        const file = new File([blob], `ig_post#${currentIndex + 1}.png`, {
            type: 'image/png'
        })
        files[currentIndex] = file
    }

    while (eventsCopy?.length) {
        const canvasEvents = eventsCopy.splice(0, eventsPerCanvas)
        const canvas = (
            <Canvas
                events={canvasEvents}
                date={date}
                key={currentIndex}
                getBlob={getBlob}
                currentIndex={currentIndex}
            />
        )
        canvases.push(canvas)
        currentIndex++
    }

    return {
        canvases,
        files
    }
}
