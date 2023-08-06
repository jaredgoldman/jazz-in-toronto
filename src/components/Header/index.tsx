// Libraries
import { signOut, useSession } from 'next-auth/react'
// Components
import Link from 'next/link'
import Button from '../Button'
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
        <header className="w-full flex-col items-center text-center">
            {headerType === HeaderType.Admin && session && (
                <Button
                    className="white absolute right-2 top-2 border p-1"
                    onClick={() => void signOut()}
                >
                    Sign Out
                </Button>
            )}

            <div className="m-8">
                <Link className="text-2xl font-bold" href="/">
                    JAZZINTORONTO
                </Link>
            </div>
            <h2>
                Connections Toronto&apos;s Jazz Musicians, Audiences, Venues and
                Presenters
            </h2>
            {showLinks && (
                <nav className="flex justify-center ">
                    <ul className="flex ">
                        {headerType === HeaderType.Public && (
                            <>
                                <li className="p-2">
                                    <Link href="/book">Book Your Gig</Link>
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
