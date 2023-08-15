import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Flex, Text } from '@radix-ui/themes'

export default function Loading() {
    const [ellipsis, setEllipsis] = useState('.')

    useEffect(() => {
        const interval = setInterval(() => {
            setEllipsis((prevEllipsis) =>
                prevEllipsis.length < 3 ? prevEllipsis + '.' : '.'
            )
        }, 1000)

        // Make sure to clear the interval when the component unmounts to avoid any potential memory leaks
        return () => clearInterval(interval)
    }, [])

    return (
        <Flex my="9" direction="column" justify="center" align="center">
            <Image
                className="animate-spin"
                src="/images/spinner.png"
                width={100}
                height={100}
                alt="loading"
            ></Image>
            <Text className="w-32" align="center">{`Loading${ellipsis}`}</Text>
        </Flex>
    )
}
