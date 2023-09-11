// Libraries
import { signOut, useSession } from 'next-auth/react'
// Components
import Link from 'next/link'
import {
    Button,
    Heading,
    Box,
    Separator,
    Link as RLink,
    Switch,
    Flex,
} from '@radix-ui/themes'
import { ComponentBooleanIcon } from '@radix-ui/react-icons'
import { useTheme } from 'next-themes'

interface Props {
    headerType: HeaderType
    showLinks?: boolean
}

export enum HeaderType {
    Admin = 'Admin',
    Public = 'Public'
}

export default function Header({
    headerType,
    showLinks = true
}: Props): JSX.Element {
    const { data: session } = useSession()
    const { theme, setTheme } = useTheme()
    return (
        <header className="mb-5 w-full flex-col items-center py-3 text-center">
            <Flex
                className="absolute left-2 top-2"
                align="center"
                justify="center"
            >
                <Switch
                    onCheckedChange={() =>
                        theme === 'dark' ? setTheme('light') : setTheme('dark')
                    }
                />
                <Box mx="1"></Box>
                <ComponentBooleanIcon />
            </Flex>
            {headerType === HeaderType.Admin && session && (
                <Button
                    className="absolute right-2 top-2"
                    onClick={() => void signOut()}
                >
                    Sign Out
                </Button>
            )}
            <Box>
                <Box mb="4">
                    <Link className="text-3xl font-bold" href="/">
                        JAZZINTORONTO
                    </Link>
                </Box>
                <Heading size="2" align="center" mb="4" className="text-3xl">
                    Connecting Toronto&apos;s Jazz Musicians, Audiences, Venues
                    and Presenters
                </Heading>
                <Separator size="4" />
            </Box>
            {showLinks && (
                <nav className="flex justify-center border-y-black">
                    <ul className="flex text-sm">
                        {headerType === HeaderType.Public && (
                            <>
                                <li className="p-2">
                                    <RLink size="3" asChild>
                                        <Link href="/book">Add Your Gig</Link>
                                    </RLink>
                                </li>
                                <li className="p-2">
                                    <RLink size="3" asChild>
                                        <Link href="/listings">Listings</Link>
                                    </RLink>
                                </li>
                                <li className="p-2">
                                    <RLink size="3" asChild>
                                        <Link href="/venues">Venues</Link>
                                    </RLink>
                                </li>
                                <li className="p-2">
                                    <RLink size="3" asChild>
                                        <Link href="/about">About Us</Link>
                                    </RLink>
                                </li>
                            </>
                        )}
                        {headerType === HeaderType.Admin && (
                            <>
                                <li className="p-2">
                                    <RLink size="3" asChild>
                                        <Link href="/admin">Dashboard</Link>
                                    </RLink>
                                </li>
                                <li className="p-2">
                                    <RLink size="3" asChild>
                                        <Link href="/admin/events">Events</Link>
                                    </RLink>
                                </li>
                                <li className="p-2">
                                    <RLink size="3" asChild>
                                        <Link href="/admin/artists">
                                            Artists
                                        </Link>
                                    </RLink>
                                </li>
                                <li className="p-2">
                                    <RLink size="3" asChild>
                                        <Link href="/admin/venues">Venues</Link>
                                    </RLink>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            )}
        </header>
    )
}
