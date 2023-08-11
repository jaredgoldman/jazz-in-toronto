import { useState, useEffect, useRef } from 'react'
import { type EventWithBandVenue } from '~/types/data'
import PostImage from '../components/postImage'

export default function usePostImages(
    events: EventWithBandVenue[] | undefined,
    date: Date,
    eventsPerCanvas = 19
) {
    // Files for uploadthingd
    const [files, setFiles] = useState<{ [key: string]: File }>({})
    // Files for rendering in the Post generator
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [postImages, setPostImages] = useState<JSX.Element[]>([])
    const eventLength = events?.length || 0
    const postImageEventsNeeded = Math.ceil(eventLength / eventsPerCanvas)
    const hasRun = useRef(false)

    const removePostImage = (index: number): void => {
        const newFiles = { ...files }
        delete newFiles[index]
        setFiles(newFiles)
        const newPostImages = [...postImages]
        newPostImages.splice(index, 1)
        setPostImages(newPostImages)
    }

    const addPostImage = (file: File, dataURL: string) => {
        const index = Object.values(files).length + 1
        const postImage = (
            <PostImage
                imgSrc={dataURL}
                index={index}
                removePostImage={() => removePostImage(index)}
            />
        )
        setFiles((prevFiles) => ({
            ...prevFiles,
            [index]: file
        }))
        setPostImages((prevPostImages) => [...prevPostImages, postImage])
    }

    useEffect(() => {
        // if it's a cnavas element, we need to get the blob
        // pull the file out of PostImage once it's rendered
        const getFile = (file: File, currentIndex: number): void => {
            // Do not store the file if it already exists
            if (files[currentIndex]) return
            setFiles((prevFiles) => ({ ...prevFiles, [currentIndex]: file }))
        }

        // don't re-run if we've mapped events
        if (events && events.length && !hasRun.current) {
            setIsLoading(true)
            const eventsCopy = events ? [...events] : []
            const images: JSX.Element[] = []
            for (let i = 0; i < postImageEventsNeeded; i++) {
                const postImageEvents = eventsCopy.splice(0, eventsPerCanvas)
                const postImage = (
                    <PostImage
                        events={postImageEvents}
                        date={date}
                        key={i}
                        fileCallback={getFile}
                        index={i}
                    />
                )
                images.push(postImage)
            }
            setPostImages((prevImages) => [...prevImages, ...images])
            hasRun.current = true
            setIsLoading(false)
        }
    }, [events, date, eventsPerCanvas, postImageEventsNeeded, files, hasRun])

    useEffect(() => {
        setPostImages([])
        hasRun.current = false
    }, [date])

    return {
        addPostImage,
        removePostImage,
        postImages,
        files,
        isLoading
    }
}
