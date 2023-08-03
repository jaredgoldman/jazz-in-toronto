import { type EventWithBandVenue } from '~/types/data'
import Image from 'next/image'
import useCanvas from '../hooks/useCanvas'

interface Props {
    events?: EventWithBandVenue[]
    date: Date
    fileCallback: (file: File, currentIndex: number) => void
    index: number
    width?: number
    height?: number
    showFileUpload?: boolean
    renderFileUploadLeft?: boolean
    // If we want to render just an image, pass in ta src
    imgSrc?: string
}

export default function PostImage({
    events,
    date,
    index,
    width = 1080,
    height = 1080,
    imgSrc = ''
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
            <div className="flex overflow-x-auto whitespace-nowrap">
                {fileData?.src && (
                    <div className="w-20 object-contain">
                        <Image
                            src={imgSrc || fileData.src}
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
