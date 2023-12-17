import { signOut, useSession } from 'next-auth/react'
import Link from '../Link'
import { Button, Heading, Flex, Separator, Box } from '@radix-ui/themes'
import { navLinks, HeaderType } from './utils'
import { HeaderDrawer } from './components/HeaderDrawer'
import { HeaderDropDown } from './components/HeaderDropDown'

export type Props = {
    headerType: HeaderType
}

export default function Header({ headerType }: Props): JSX.Element {
    const { data: session } = useSession()
    return (
        <>
            <Flex gap="4" p="4" align="center" justify="center">
                <Flex align="center" gap="4" justify="between" width="100%">
                    <Heading weight="bold">
                        <Link size="6" href="/">
                            JAZZINTORONTO
                        </Link>
                    </Heading>
                    <Flex
                        gap="4"
                        display={{ initial: 'none', xs: 'flex' }}
                        align="center"
                    >
                        {navLinks[headerType].map((link, i) => {
                            if ('nested' in link && link.nested) {
                                return (
                                    <HeaderDropDown
                                        links={link.nested}
                                        key={i}
                                    />
                                )
                            }
                            return (
                                <Link
                                    size="3"
                                    href={link.href}
                                    key={link.title}
                                >
                                    {link.title}
                                </Link>
                            )
                        })}
                    </Flex>
                    <Box display={{ initial: 'block', xs: 'none' }}>
                        <HeaderDrawer headerType={headerType} />
                    </Box>
                    {headerType === HeaderType.Admin && session && (
                        <Button onClick={() => void signOut()}>Sign Out</Button>
                    )}
                </Flex>
            </Flex>
            <Separator size="4" />
        </>
    )
}
