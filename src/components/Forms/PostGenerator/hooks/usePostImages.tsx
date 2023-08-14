import { useState, useEffect, useRef } from 'react'
import { type EventWithBandVenue } from '~/types/data'
import PostImage from '../components/postImage'
import useCanvas from './useCanvas'
import { FileData } from '~/types/data'
export default function usePostImages(
    events: EventWithBandVenue[] | undefined,
    date: Date,
    eventsPerCanvas = 19
) {
    const createCanvas = useCanvas()
    const [files, setFiles] = useState<FileData[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    //
    // const removePostImage = (index: number): void => {
    //     const newFiles = { ...files }
    //     delete newFiles[index]
    //     setFiles(newFiles)
    //     const newPostImages = [...postImages]
    //     newPostImages.splice(index, 1)
    //     setPostImages(newPostImages)
    // }
    //
    // const addPostImage = (file: File, dataURL: string) => {
    //     const index = Object.values(files).length + 1
    //     const postImage = (
    //         <PostImage
    //             imgSrc={dataURL}
    //             index={index}
    //             removePostImage={() => removePostImage(index)}
    //         />
    //     )
    //     setFiles((prevFiles) => ({
    //         ...prevFiles,
    //         [index]: file
    //     }))
    //     setPostImages((prevPostImages) => [...prevPostImages, postImage])
    // }
    //

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
        mapPostImages()
    }, [date, events])

    return {
        isLoading,
        files
    }
}
