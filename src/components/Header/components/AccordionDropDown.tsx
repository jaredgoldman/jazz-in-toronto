import { useState } from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import Link from '~/components/Link'
import { Flex } from '@radix-ui/themes'
import { ChevronDownIcon, ChevronRightIcon } from '@radix-ui/react-icons'

export type Props = {
    links: { title: string; href: string }[]
    title: string
}
export function HeaderAccordion({ links, title }: Props) {
    const [open, setOpen] = useState(false)
    return (
        <Accordion.Root
            type="multiple"
            onValueChange={() => {
                setOpen((prevValue) => !prevValue)
            }}
        >
            <Accordion.Item value="1">
                <Accordion.Trigger>
                    <Flex align="center" gap="1">
                        {title}
                        {open ? <ChevronDownIcon /> : <ChevronRightIcon />}
                    </Flex>
                </Accordion.Trigger>
                <Accordion.Content>
                    <Flex direction="column" gap="1">
                        {links.map((link, i) => (
                            <Link size="1" href={link.href} key={i}>
                                {link.title}
                            </Link>
                        ))}
                    </Flex>
                </Accordion.Content>
            </Accordion.Item>
        </Accordion.Root>
    )
}
