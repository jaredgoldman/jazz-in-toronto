import Image from 'next/image'
import { Flex } from '@radix-ui/themes'

export default function Loading() {
    return (
        <Flex my="9" justify="center" align="center">
            <Image
                className="animate-spin"
                src="/images/spinner.png"
                width={100}
                height={100}
                alt="loading"
                >
            </Image>
        </Flex>
    )
}
