// Libraries
import { useState, useEffect } from 'react'
// Types
import { type EventWithArtistVenue } from '~/types/data'
import { type FileData } from '~/types/data'
// Hookes
import useCanvas from './useCanvas'

export default function usePostImages(
    events: EventWithArtistVenue[] | undefined,
    date: Date,
    eventsPerCanvas = 19
) {
    const createCanvas = useCanvas()
    const [files, setFiles] = useState<FileData[]>([])

    useEffect(() => {
        const files: FileData[] = []

        const mapPostImages = async () => {
            if (!events?.length) return
            const eventLength = events?.length || 0
            const postImageEventsNeeded = Math.ceil(
                eventLength / eventsPerCanvas
            )

            const eventsCopy = [...events]
            for (let i = 0; i < postImageEventsNeeded; i++) {
                const eventsSlice = eventsCopy.splice(0, eventsPerCanvas)
                const fileData = await createCanvas(eventsSlice, i, date)
                fileData && files.push(fileData)
            }
            setFiles(files)
        }
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        events?.length && mapPostImages()
    }, [date, events, createCanvas, eventsPerCanvas])

    return {
        files
    }
}
