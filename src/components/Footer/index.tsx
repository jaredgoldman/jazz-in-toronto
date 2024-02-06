import { Separator, Flex, Link } from '@radix-ui/themes'

export default function Footer(): JSX.Element {
    return (
        <footer className="w-full">
            <Separator size="4" />
            <Flex p="4" gap="5">
                <Link href="https://github.com/jaredgoldman/jazz-in-toronto">
                    Github
                </Link>
                <Link href="https://github.com/jaredgoldman/jazz-in-toronto">
                    Privacy Policy
                </Link>
            </Flex>
        </footer>
    )
}
