// Components
import { Text, Separator, Box, Link as RLink } from '@radix-ui/themes'
import Link from 'next/link'

export default function Footer(): JSX.Element {
    return (
        <footer className="w-full">
            <Separator size="4" />
            <Box p="4">
                <Text as="span" align="left" size="2">
                    Made by{' '}
                    <RLink asChild>
                        <Link href="https://jaredgoldman.dev">
                            Jared Goldman
                        </Link>
                    </RLink>
                </Text>
            </Box>
        </footer>
    )
}
