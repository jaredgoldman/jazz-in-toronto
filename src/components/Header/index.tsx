// Libraries
import { signOut, useSession } from 'next-auth/react'
// Components
import Link from '../Link'
import { default as NextLink } from 'next/link'
import { Button, Flex, Heading, Separator } from '@radix-ui/themes'
// Utils
import DarkModeToggle from '../DarkModeToggle'
import { Hepta_Slab } from 'next/font/google'

const hepta_slab = Hepta_Slab({
    weight: ['400', '500'],
    subsets: ['latin'],
    preload: true
})

interface Props {
    headerType: HeaderType
    showLinks?: boolean
}

export enum HeaderType {
    Admin = 'Admin',
    Public = 'Public'
}

const LinkStyles = `
  relative inline-block cursor-pointer hover:text-orange-600 dark:text-white text-orange-700 before:duration-500 transition-all before:absolute before:-bottom-[2px] before:left-0 before:h-[1px] before:w-0 before:rounded-1/2 before:bg-orange-600 before:opacity-0 before:content-[''] before:animate-navlinkOut hover:before:animate-navlinkIn hover:before:opacity-70
`

export default function Header({
    headerType,
    showLinks = true
}: Props): JSX.Element {
    const { data: session } = useSession()
    return (
        <header>
            <div className="mx-auto inline-block flex justify-between no-underline lg:w-[82%]">
                <Flex
                    width="100%"
                    align="center"
                    justify="between"
                    px="4"
                    mx="auto"
                    py="5"
                >
                    <Flex align="center">
                        <Heading ml="1" mr="6" size="7">
                            <NextLink
                                href="/"
                                className="text-black transition-all duration-200 ease-in-out hover:text-orange-600 dark:text-white dark:hover:text-orange-400 sm:text-[4.5vmin]"
                            >
                                JAZZINTORONTO
                            </NextLink>
                        </Heading>
                    </Flex>
                    <Flex justify="end" mx="4" width="100%">
                        {showLinks && (
                            <nav
                                className={`flex ${hepta_slab.className} font-medium`}
                            >
                                <ul className="flex gap-4">
                                    {headerType === HeaderType.Public && (
                                        <>
                                            <li>
                                                <NextLink
                                                    href="/book"
                                                    className={LinkStyles}
                                                >
                                                    Add Your Gig
                                                </NextLink>
                                            </li>
                                            <li>
                                                <NextLink
                                                    href="/listings"
                                                    className={LinkStyles}
                                                >
                                                    Listings
                                                </NextLink>
                                            </li>
                                            <li>
                                                <NextLink
                                                    href="/venues"
                                                    className={LinkStyles}
                                                >
                                                    Venues
                                                </NextLink>
                                            </li>
                                            <li>
                                                <NextLink
                                                    href="/about"
                                                    className={LinkStyles}
                                                >
                                                    About Us
                                                </NextLink>
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
                                                <Link
                                                    href="/admin/events"
                                                    size="5"
                                                >
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
                                                <Link
                                                    href="/admin/venues"
                                                    size="5"
                                                >
                                                    Venues
                                                </Link>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </nav>
                        )}
                    </Flex>
                </Flex>
                <Flex justify="end" align="center" gap="4">
                    {headerType === HeaderType.Admin && session && (
                        <Button onClick={() => void signOut()}>Sign Out</Button>
                    )}
                    <DarkModeToggle />
                </Flex>
            </div>

            <Separator size="4" />
        </header>
    )
}
