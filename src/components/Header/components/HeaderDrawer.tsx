import { Dialog, Flex, Button } from '@radix-ui/themes'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import Link from '~/components/Link'
import { HeaderType, navLinks } from '../utils'
import { HeaderAccordion } from './AccordionDropDown'

interface Props {
    headerType: HeaderType
}

export function HeaderDrawer({ headerType }: Props) {
    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <HamburgerMenuIcon />
            </Dialog.Trigger>
            <Dialog.Content
                style={{
                    maxHeight: undefined,
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '50%',
                    maxWidth: '30rem',
                    minHeight: '100%',
                    display: "flex"
                }}
            >
                <Flex direction="column" justify="between" grow="1">
                    <Flex direction="column" gap="2">
                        <Link size="4" href="/">
                            Home
                        </Link>
                        {navLinks[headerType].map((link) => {
                            if ('nested' in link && link.nested) {
                                return (
                                    <HeaderAccordion
                                        key={link.href}
                                        links={link.nested}
                                        title={link.title}
                                    />
                                )
                            }
                            return (
                                <Link size="4" href={link.href} key={link.href}>
                                    {link.title}
                                </Link>
                            )
                        })}
                    </Flex>
                    <Dialog.Close>
                        <Button variant="outline">Close</Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    )
}
