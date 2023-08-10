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
        <header className="mb-5 w-full flex-col items-center bg-gray-800 pb-2 text-center">
            {headerType === HeaderType.Admin && session && (
                <Button onClick={() => void signOut()}>Sign Out</Button>
            )}

            <div className="mx-auto w-3/4 justify-center border-b-2 border-white pb-4 pt-8">
                <Link className="text-3xl font-bold" href="/">
                    JAZZINTORONTO
                </Link>
                <h2 className="m-auto mb-2 w-1/2 text-center">
                    Connecting Toronto&apos;s Jazz Musicians, Audiences, Venues
                    and Presenters
                </h2>
            </div>
            {showLinks && (
                <nav className="mt-2 flex justify-center">
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
