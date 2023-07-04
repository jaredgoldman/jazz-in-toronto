import Link from "next/link"

export default function Header(): JSX.Element {
    return (
        <header className="w-full flex-col items-center text-center">
            <h1>JAZZINTORONTO</h1>
            <h2>
                Connections Toronto's Jazz Musicians, Audiences, Venues and
                Presenters
            </h2>
            <nav className="flex justify-center ">
                <ul className="flex ">
                    <li className="p-2">
                        <Link href="/home">Home</Link>
                    </li>
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
                </ul>
            </nav>
        </header>
    )
}
