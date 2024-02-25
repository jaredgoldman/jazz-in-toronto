import { useState, useEffect, useCallback, useMemo } from 'react'
import { api } from '~/utils/api'
import useCanvas from './useCanvas'
import { EventWithArtistVenue } from '~/types/data'
import { DateTime } from 'luxon'

export default function usePostImages(date: string, eventsPerCanvas = 19) {
    const createCanvas = useCanvas()
    const [files, setFiles] = useState<File[]>([])
    const [isMapPostImagesLoading, setIsMapPostImagesLoading] = useState(false)
    const getAllEventsQuery = api.event.getAllByDay.useQuery({
        date: new Date(date),
        showUnapproved: false
    })

    const eventLength = getAllEventsQuery.data?.length || 0
    const postImageEventsNeeded = Math.ceil(eventLength / eventsPerCanvas)

    /**
     * Map the events to the canvas and create the files
     * @param data - The events to map
     * @returns The files
     */
    const mapPostImages = useCallback(
        async (data: EventWithArtistVenue[]) => {
            const tempFiles = []
            for (let i = 0; i < postImageEventsNeeded; i++) {
                const eventsSlice = data.splice(0, eventsPerCanvas)
                const fileData = await createCanvas(
                    eventsSlice,
                    i,
                    new Date(date)
                )
                fileData && tempFiles.push(fileData)
            }
            setFiles(tempFiles)
        },
        [createCanvas, eventsPerCanvas, postImageEventsNeeded, date]
    )

    // If we have all the files we need, we can stop loading
    useEffect(() => {
        if (files.length >= postImageEventsNeeded) {
            setIsMapPostImagesLoading(false)
        }
    }, [files, postImageEventsNeeded])

    // If we have all the events we need, we can start creating the files
    useEffect(() => {
        if (getAllEventsQuery.data?.length && !files.length) {
            setIsMapPostImagesLoading(true)
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            mapPostImages(getAllEventsQuery.data)
        }
    }, [getAllEventsQuery.data, mapPostImages, files])

    const isLoading = useMemo(
        () => getAllEventsQuery.isLoading || isMapPostImagesLoading,
        [getAllEventsQuery.isLoading, isMapPostImagesLoading]
    )

    return { files, isLoading }
}
