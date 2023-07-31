import { useState } from 'react'
import { type EventWithBandVenue } from '~/types/data'
import Canvas from '../components/canvas'

export default function useCanvas(
    events: EventWithBandVenue[] | undefined,
    date: Date,
    eventsPerCanvas = 19
) {
    const [blobs, setBlobs] = useState<{ [key: number]: Blob }>({})
    const canvases: JSX.Element[] = []
    const eventsCopy = events ? [...events] : []
    let currentIndex = 0

    const getBlob = (
        canvas: HTMLCanvasElement | null,
        currentIndex: number
    ): Promise<Blob> => {
        return new Promise(() => {
            canvas?.toBlob((blob) => {
                if (blob) {
                    setBlobs((prevBlobs) => ({
                        ...prevBlobs,
                        [currentIndex]: blob
                    }))
                }
            })
        })
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
        blobs
    }
}
