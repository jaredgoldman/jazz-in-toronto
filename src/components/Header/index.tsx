// Libraries
import { signOut, useSession } from 'next-auth/react'
// Components
import Link from '../Link'
import { default as NextLink } from 'next/link'
import { Button, Heading, Flex, Separator } from '@radix-ui/themes'
// Utils
import DarkModeToggle from '../DarkModeToggle'

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
    return (
        <header>
            <Flex width="100%" align="center" px="4" py="5">
                <Flex align="center">
                    <Heading ml="1" mr="6" size="7">
                        <NextLink
                            href="/"
                            className="text-black hover:text-orange-400 dark:text-white dark:hover:text-orange-400"
                        >
                            JAZZINTORONTO
                        </NextLink>
                    </Heading>
                </Flex>
                <Flex justify="between" align="center" width="100%">
                    {showLinks && (
                        <nav className="flex items-end justify-start border-y-black">
                            <ul className="flex text-sm">
                                {headerType === HeaderType.Public && (
                                    <>
                                        <li className="px-2">
                                            <Link href="/book" size="5">
                                                Add Your Gig
                                            </Link>
                                        </li>
                                        <li className="px-2">
                                            <Link href="/listings" size="5">
                                                Listings
                                            </Link>
                                        </li>
                                        <li className="px-2">
                                            <Link href="/venues" size="5">
                                                Venues
                                            </Link>
                                        </li>
                                        <li className="px-2">
                                            <Link href="/about" size="5">
                                                About Us
                                            </Link>
                                        </li>
                                    </>
                                )}
                                {headerType === HeaderType.Admin && (
                                    <>
                                        <li className="px-2">
                                            <Link href="/admin" size="5">
                                                Dashboard
                                            </Link>
                                        </li>
                                        <li className="px-2">
                                            <Link href="/admin/events" size="5">
                                                Events
                                            </Link>
                                        </li>
                                        <li className="px-2">
                                            <Link
                                                href="/admin/artists"
                                                size="5"
                                            >
                                                Artists
                                            </Link>
                                        </li>
                                        <li className="px-2">
                                            <Link href="/admin/venues" size="5">
                                                Venues
                                            </Link>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </nav>
                    )}
                </Flex>
                <Flex justify="end" gap="4">
                    {headerType === HeaderType.Admin && session && (
                        <Button onClick={() => void signOut()}>Sign Out</Button>
                    )}
                </Flex>
            </Flex>
            <Separator size="4" />
        </header>
    )
}
