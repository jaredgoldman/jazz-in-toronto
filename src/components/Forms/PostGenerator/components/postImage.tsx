import { useEffect, useState } from 'react'
import { type EventWithBandVenue } from '~/types/data'
import Image from 'next/image'
import useCanvas from '../hooks/useCanvas'

interface Props {
    events?: EventWithBandVenue[]
    date?: Date
    fileCallback?: (file: File, currentIndex: number) => void
    index?: number
    width?: number
    height?: number
    showFileUpload?: boolean
    renderFileUploadLeft?: boolean
    // If we want to render just an image, pass in ta src
    imgSrc?: string
    removePostImage?: () => void
}

export default function PostImage({
    events,
    date,
    fileCallback,
    index,
    width = 1080,
    height = 1080,
    imgSrc = '',
    removePostImage
}: Props) {
    // We pass events and other props to useCanvas
    // We get back a ref, when it is rendered in this file
    // we can get the dataURL/Blob/File
    const { canvasRef, fileData } = useCanvas({
        events,
        date,
        index,
        width,
        height
    })

    const [src, setSrc] = useState<string | undefined>(imgSrc || undefined)
    // When the fileData is set, we call the callback
    useEffect(() => {
        if (fileData?.file && fileCallback && index) {
            fileCallback(fileData.file, index)
            setSrc(fileData.src)
        }
    }, [fileData, fileCallback, index])

    // We have to render the canvas to get the dataURL/Blob/File
    return (
        <div className="m-2">
            {canvasRef && (
                <canvas
                    className="hidden"
                    ref={canvasRef}
                    width={width}
                    height={height}
                ></canvas>
            )}
            <div className="relative flex overflow-x-auto whitespace-nowrap">
                {src && (
                    <div className="relative w-20 object-contain">
                        {removePostImage && (
                            <button
                                className="absolute right-0 top-0"
                                onClick={removePostImage}
                            >
                                X
                            </button>
                        )}
                        <Image
                            src={src}
                            width={width}
                            height={height}
                            className="h-full w-full"
                            alt="post"
                        />
                    </div>
                )}
            </div>
        </div>
    )
}
