import { useState, useEffect, useCallback, useMemo } from 'react'
import { api } from '~/utils/api'
import useCanvas from './useCanvas'
import { EventWithArtistVenue } from '~/types/data'

/**
 * usePostImages hook
 * @param {string} dateString - The date string formatted as MM-DD-YYYY
 * @param {number} eventsPerCanvas - The number of events per canvas
 * @returns The files and loading state
 */
export default function usePostImages(
    dateString: string,
    eventsPerCanvas = 19
) {
    const createCanvas = useCanvas()
    const date = useMemo(() => new Date(dateString), [dateString])
    const [files, setFiles] = useState<File[]>([])
    // XXX: extra state is needed here to prevent re-rendering hell
    const [hasMapped, setHasMapped] = useState(false)
    const getAllEventsQuery = api.event.getAllByDay.useQuery(
        {
            date,
            showUnapproved: false
        },
        { refetchOnWindowFocus: false }
    )

    /**
     * Map the events to the canvas and create the files
     * @param {EventWithArtistVenue[]} data - The events to map
     * @returns The files
     */
    const generatePostImages = useCallback(
        async (data: EventWithArtistVenue[], date: Date) => {
            const imagesNeeded = Math.ceil(data.length / eventsPerCanvas)
            const postImageFiles = []
            const eventsData = [...data]
            for (let i = 0; i < imagesNeeded; i++) {
                const start = i * eventsPerCanvas
                const end = start + eventsPerCanvas
                const eventsSlice = eventsData.slice(start, end)
                const fileData = await createCanvas(eventsSlice, i, date)
                postImageFiles.push(fileData)
            }
            return postImageFiles
        },
        [createCanvas, getAllEventsQuery.data]
    )

    // Generate the files once when the events are fetched
    useEffect(() => {
        if (getAllEventsQuery.isFetched && !hasMapped) {
            getAllEventsQuery?.data?.length
                ? generatePostImages(getAllEventsQuery.data, date).then(
                      (files) => {
                          setFiles(files)
                      }
                  )
                : setFiles([])
        }
    }, [getAllEventsQuery, hasMapped, date, generatePostImages])

    // Set to stop re-rendering hell
    useEffect(() => {
        setHasMapped(true)
    }, [files, setHasMapped])

    // Re-generate the files if the date changes
    useEffect(() => {
        setHasMapped(false)
    }, [date])

    return { files, isLoading: getAllEventsQuery.isLoading }
}
