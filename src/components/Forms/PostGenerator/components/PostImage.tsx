// componenets
import Image from 'next/image'
import { Box, Button, Card } from '@radix-ui/themes'

interface Props {
    key: string
    width?: number
    height?: number
    src?: string
    removePostImage?: () => void
}

export default function PostImage({
    key,
    width = 500,
    height = 500,
    src,
    removePostImage
}: Props) {
    return (
        <Card m="3" key={key} className="bg-gray-200 p-0">
            {src && (
                <Box className="border-1 relative border-black">
                    {removePostImage && (
                        <Button
                            className="absolute right-0 top-0"
                            onClick={removePostImage}
                        >
                            X
                        </Button>
                    )}

                    <Image
                        src={src}
                        width={width}
                        height={height}
                        alt="post"
                        className="h-auto min-w-[500px]"
                    />
                </Box>
            )}
        </Card>
    )
}
