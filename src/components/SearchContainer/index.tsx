import { useState } from "react"
import { Venue, Band } from "@prisma/client"
import { EventWithBandVenue } from "~/types/data"

interface Props {
    items: Venue[] | Band[] | EventWithBandVenue[] | undefined
    isLoading: boolean
}

export default function SearchContainer({
    items,
    isLoading
}: Props): JSX.Element {
    const [searchTerm, setSearchTerm] = useState<string>("")
    // sort by date
    // sort by name (include website and instagram handle)

    const searchedItems = isLoading || !items ? (
        <div>Loading...</div>
    ) : (
        items.map((item) => {
            return <div>{item.name}</div>
        })
    )

    return (
        <div>
            <div>{searchedItems}</div>
        </div>
    )
}
