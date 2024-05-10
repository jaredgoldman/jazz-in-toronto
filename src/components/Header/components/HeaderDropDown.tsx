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
                    className="m-0 min-w-[7.5rem] max-w-[7.5rem] p-0"
                >
                    Add
                </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content
                size="2"
                align="center"
                className="w-dropdown"
            >
                <Flex direction="column" align="center" gap="4">
                    {links.map((link) => (
                        <Link href={link.href} size="3" key={link.title}>
                            {link.title}
                        </Link>
                    ))}
                </Flex>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    )
}
