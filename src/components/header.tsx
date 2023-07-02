import Link from "next/link"

export default function Header() {
    return (
        <header>
            <h1>JAZZINTORONTO</h1>
            <h2>
                Connections Toronto's Jazz Musicians, Audiences, Venues and
                Presenters
            </h2>
            <nav>
                <ul>
                    <li>
                        <Link href="/home">Home</Link>
                    </li>
                    <li>
                        <Link href="/listings">Listings</Link>
                    </li>
                    <li>
                        <Link href="/venues">Venues</Link>
                    </li>
                    <li>
                        <Link href="/about">About Us</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
