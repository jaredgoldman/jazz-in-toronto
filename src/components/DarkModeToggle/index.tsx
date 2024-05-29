import { Flex, Box, Switch } from '@radix-ui/themes'
import { ComponentBooleanIcon } from '@radix-ui/react-icons'
import { useTheme } from 'next-themes'

interface Props {
    className?: string
}

export default function DarkModeToggle({ className }: Props) {
    const { theme, setTheme } = useTheme()
    return (
        <Flex className={className} align="center" justify="center">
            <Switch
                onCheckedChange={() =>
                    theme === 'dark' ? setTheme('light') : setTheme('dark')
                }
            />
            <Box mx="1"></Box>
            <ComponentBooleanIcon />
        </Flex>
    )
}
