import { useState, useEffect } from 'react'
import useCanvas from './useCanvas'
import { type EventWithBandVenue } from '~/types/data'
import { type FileData } from '~/types/data'

export default function usePostImages(
    events: EventWithBandVenue[] | undefined,
    date: Date,
    eventsPerCanvas = 19
) {
    const createCanvas = useCanvas()
    const [files, setFiles] = useState<FileData[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        const files: FileData[] = []

        const mapPostImages = async () => {
            setIsLoading(true)
            if (events?.length) {
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
            }
            setFiles(files)
            setIsLoading(false)
        }
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        mapPostImages()
    }, [date, events, createCanvas, eventsPerCanvas])

    return {
        isLoading,
        files
    }
}
