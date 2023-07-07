import Link from "next/link"
import { HeaderType } from "./types"

interface Props {
    headerType: HeaderType
}

export default function Header({ headerType }): JSX.Element {
    return (
        <header className="w-full flex-col items-center text-center">
            <h1>JAZZINTORONTO</h1>
            <h2>
                Connections Toronto's Jazz Musicians, Audiences, Venues and
                Presenters
            </h2>
            <nav className="flex justify-center ">
                <ul className="flex ">
                    {headerType === HeaderType.Public && (
                        <>
                            <li className="p-2">
                                <Link href="/home">Home</Link>
                            </li>
                            <li className="p-2">
                                <Link href="/book">Book Your Gig</Link>
                            </li>
                            <li className="p-2">
                                <Link href="/venue">Add Your Venue</Link>
                            </li>
                            <li className="p-2">
                                <Link href="/band">Add Your Band</Link>
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
                                <Link href="/events">Events</Link>
                            </li>
                            <li className="p-2">
                                <Link href="/bands">Bands</Link>
                            </li>
                          <li className="p-2">
                                <Link href="/venues">Venues</Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    )
}
