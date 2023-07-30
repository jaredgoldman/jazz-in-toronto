// Libraries
import { useState } from 'react'
// Components
import Button from '../Button'

interface Props {
    canvases: JSX.Element[]
}

export default function Gallery({ canvases }: Props): JSX.Element {
    const [canvasIndex, setCanvasIndex] = useState<number>(0)

    const nextImage = () => {
        setCanvasIndex((prevIndex) => prevIndex + 1)
    }

    const prevImage = () => {
        setCanvasIndex((prevIndex) => prevIndex - 1)
    }

    const showNavButtons = canvases.length > 1

    return (
        <div className="flex">
            {showNavButtons && (
                <Button
                    onClick={prevImage}
                    disabled={canvasIndex === 0}
                >{`<`}</Button>
            )}
            {canvases.length > 0 && <>{canvases[canvasIndex]}</>}
            {showNavButtons && (
                <Button
                    onClick={nextImage}
                    disabled={canvasIndex === canvases.length - 1}
                >{`>`}</Button>
            )}
        </div>
    )
}
