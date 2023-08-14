// Libraries
import { signOut, useSession } from 'next-auth/react'
// Components
import Link from 'next/link'
import { Button, Heading } from '@radix-ui/themes'
// Types
import { HeaderType } from './types'

interface Props {
    headerType: HeaderType
    showLinks?: boolean
}

export default function Header({
    headerType,
    showLinks = true
}: Props): JSX.Element {
    const { data: session } = useSession()
    return (
        <header className="mb-5 w-full flex-col items-center pb-2 text-center">
            {headerType === HeaderType.Admin && session && (
                <Button
                    className="absolute right-2 top-2"
                    onClick={() => void signOut()}
                >
                    Sign Out
                </Button>
            )}

            <div className="mx-auto w-3/4 justify-center border-b-2 border-white pt-8">
                <Link className="text-3xl font-bold" href="/">
                    JAZZINTORONTO
                </Link>
                <Heading size="2" align="center">
                    Connecting Toronto&apos;s Jazz Musicians, Audiences, Venues
                    and Presenters
                </Heading>
            </div>
            {showLinks && (
                <nav className="flex justify-center border-y-black">
                    <ul className="flex text-sm">
                        {headerType === HeaderType.Public && (
                            <>
                                <li className="p-2">
                                    <Link href="/book">Add Your Gig</Link>
                                </li>
                                <li className="p-2">
                                    <Link href="/listings">Listings</Link>
                                </li>
                                <li className="p-2">
                                    <Link href="/venues">Venues</Link>
                                </li>
                                <li className="p-2">
                                    <Link href="/about">About Us</Link>
                                </li>
                            </>
                        )}
                        {headerType === HeaderType.Admin && (
                            <>
                                <li className="p-2">
                                    <Link href="/admin">Dashboard</Link>
                                </li>
                                <li className="p-2">
                                    <Link href="/admin/events">Events</Link>
                                </li>
                                <li className="p-2">
                                    <Link href="/admin/bands">Bands</Link>
                                </li>
                                <li className="p-2">
                                    <Link href="/admin/venues">Venues</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            )}
        </header>
    )
}
