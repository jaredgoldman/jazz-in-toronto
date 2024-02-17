import { useState, useEffect } from 'react'
import { EventWithArtistVenue } from '~/types/data'
import useCanvas from './useCanvas'

export default function usePostImages(
    events: EventWithArtistVenue[] | undefined,
    date: Date,
    eventsPerCanvas = 19
) {
    const createCanvas = useCanvas()
    const [files, setFiles] = useState<File[]>([])

    useEffect(() => {
        const files: File[] = []

        const mapPostImages = async () => {
            const eventLength = events?.length || 0
            const postImageEventsNeeded = Math.ceil(
                eventLength / eventsPerCanvas
            )

            const eventsCopy = [...events!!]
            for (let i = 0; i < postImageEventsNeeded; i++) {
                const eventsSlice = eventsCopy.splice(0, eventsPerCanvas)
                const fileData = await createCanvas(eventsSlice, i, date)
                fileData && files.push(fileData)
            }
            setFiles(files)
        }
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        events && mapPostImages()
    }, [date, events, createCanvas, eventsPerCanvas])

    return {
        files
    }
}
