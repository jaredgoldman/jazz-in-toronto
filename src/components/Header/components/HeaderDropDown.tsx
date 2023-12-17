import { DropdownMenu, Button, Flex } from '@radix-ui/themes'
import Link from '~/components/Link'

export type Props = {
    links: { title: string; href: string }[]
}

export function HeaderDropDown({ links }: Props) {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <Button
                    variant="surface"
                    className="min-w-[7.5rem] max-w-[7.5rem]"
                >
                    Add
                </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content size="2" align="center">
                <Flex
                    direction="column"
                    gap="2"
                    className="min-w-[7.5rem] max-w-[7.5rem]"
                >
                    {links.map((link) => (
                        <Link href={link.href} key={link.title}>
                            {link.title}
                        </Link>
                    ))}
                </Flex>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    )
}
