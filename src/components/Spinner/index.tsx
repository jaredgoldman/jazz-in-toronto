import Image from 'next/image'

interface Props {
    width?: number
    height?: number
}
/**
 * Spinner for loading states
 * @param {number} width
 * @param {number} height
 */
export default function Spinner({ width = 100, height = 100 }: Props) {
    return (
        <Image
            className="animate-spin"
            src="/images/spinner.png"
            width={width}
            height={height}
            alt="loading"
        ></Image>
    )
}
