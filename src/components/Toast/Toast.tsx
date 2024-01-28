import { Cross1Icon } from '@radix-ui/react-icons'
import { Flex, Box, Heading, Text } from '@radix-ui/themes'
import { useAtom } from 'jotai'
import { toastAtom } from '~/hooks/useToast'

const bgColors = {
    success: 'bg-green-500',
    error: 'bg-rose-500',
    warning: 'bg-orange-500',
    info: 'bg-blue-500'
} as const

export function Toast() {
    const [toastData, setToastData] = useAtom(toastAtom)
    const bgColor = bgColors[toastData.type]
    const animationClass = toastData.visible
        ? 'animate-fadeIn'
        : 'animate-swipeOut'

    return (
        <Box
            p="3"
            grow="1"
            className={`fixed right-0 bottom-0 ${bgColor} z-50 m-4 rounded-md shadow-md ${animationClass} min-w-[18rem]`}
        >
            <Cross1Icon
                color="black"
                onClick={() =>
                    setToastData({
                        ...toastData,
                        visible: false
                    })
                }
                className="absolute right-2 top-2 cursor-pointer"
                width="18"
                height="18"
                strokeWidth="4"
            />
            <Flex justify="between">
                <Heading>{toastData.title}</Heading>
            </Flex>
            <Text>{toastData.message}</Text>
        </Box>
    )
}
