// Libraries
import { signOut, useSession } from 'next-auth/react'
// Components
import Link from '../Link'
import { default as NextLink } from 'next/link'
import { Button, Flex, Heading, Separator } from '@radix-ui/themes'
// Utils
import DarkModeToggle from '../DarkModeToggle'
import { Hepta_Slab } from 'next/font/google'
import styles from './index.module.css'

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

export default function Header({
    headerType,
    showLinks = true
}: Props): JSX.Element {
    const { data: session } = useSession()
    return (
        <header>
            <Flex width="100%" align="end" px="4" py="5">
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
                <Flex justify="between" width="100%">
                    {showLinks && (
                        <nav
                            className={`flex ${hepta_slab.className} font-medium`}
                        >
                            <ul className="flex">
                                {headerType === HeaderType.Public && (
                                    <>
                                        <li
                                            // tried changing the config at .eslintrc.cjs but it didn't work
                                            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                                            className={`${styles.underline} px-2`}
                                        >
                                            <Link
                                                href="/book"
                                                size="3"
                                                className={styles.noUnderline}
                                            >
                                                Add Your Gig
                                            </Link>
                                        </li>
                                        <li
                                            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                                            className={`${styles.underline} px-2`}
                                        >
                                            <Link
                                                href="/listings"
                                                size="3"
                                                className={styles.noUnderline}
                                            >
                                                Listings
                                            </Link>
                                        </li>
                                        <li
                                            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                                            className={`${styles.underline} px-2`}
                                        >
                                            <Link
                                                href="/venues"
                                                size="3"
                                                className={styles.noUnderline}
                                            >
                                                Venues
                                            </Link>
                                        </li>
                                        <li
                                            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                                            className={`${styles.underline} px-2`}
                                        >
                                            <Link
                                                href="/about"
                                                size="3"
                                                className={styles.noUnderline}
                                            >
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
                    <DarkModeToggle />
                </Flex>
            </Flex>
            <Separator size="4" />
        </header>
    )
}
