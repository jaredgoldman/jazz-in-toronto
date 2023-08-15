// Components
import { Text } from '@radix-ui/themes'
import Link from 'next/link'

export default function Footer(): JSX.Element {
    return (
        <footer className="w-full p-2">
            <Text as="span" align="left" size="1">
                Made by{' '}
                <Link href="https://jaredgoldman.dev">Jared Goldman</Link>
            </Text>
        </footer>
    )
}
