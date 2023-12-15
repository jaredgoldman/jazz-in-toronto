import { Dialog, Flex } from '@radix-ui/themes'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import Link from '~/components/Link'

export function HeaderDrawer() {
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
                {' '}
                <Flex direction="column" gap="2">
                    <Link href="/event" size="5">
                        Add Your Gig
                    </Link>
                    <Link href="/listings" size="5">
                        Listings
                    </Link>
                    <Link href="/venues" size="5">
                        Venues
                    </Link>
                    <Link href="/about" size="5">
                        About Us
                    </Link>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    )
}
