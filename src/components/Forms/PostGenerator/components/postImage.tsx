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
    width = 200,
    height = 200,
    src,
    removePostImage
}: Props) {
    return (
        <Card m="3" key={key}>
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

                    <Image src={src} width={width} height={height} alt="post" />
                </Box>
            )}
        </Card>
    )
}
