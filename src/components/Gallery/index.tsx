// Libraries
import { useState } from 'react'
// Components
import Button from '../Button'
import Image from 'next/image'

interface Props {
    images: string[]
}

export default function Gallery({ images }: Props): JSX.Element {
    const [imageIndex, setImageIndex] = useState<number>(0)

    const nextImage = () => {
        setImageIndex((prevIndex) => prevIndex + 1)
    }

    const prevImage = () => {
        setImageIndex((prevIndex) => prevIndex - 1)
    }

    const showNavButtons = images.length > 1

    return (
        <div className="flex">
            {showNavButtons && (
                <Button
                    onClick={prevImage}
                    disabled={imageIndex === 0}
                >{`<`}</Button>
            )}
            <div>
                <Image
                    src={images[imageIndex] as string}
                    alt="pending instagram post"
                />
            </div>
            {showNavButtons && (
                <Button
                    onClick={nextImage}
                    disabled={imageIndex === images.length - 1}
                >{`>`}</Button>
            )}
        </div>
    )
}
