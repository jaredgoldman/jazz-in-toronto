import { Dialog, Flex } from '@radix-ui/themes'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import Link from '~/components/Link'
import { HeaderType, navLinks } from '../utils'

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
                    minHeight: '100%'
                }}
            >
                <Flex direction="column" gap="2">
                    <Link size="4" href="/">
                        Home
                    </Link>
                    {navLinks[headerType].map((link) => (
                        <Link size="4" href={link.href} key={link.href}>
                            {link.title}
                        </Link>
                    ))}
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    )
}
