import { Band } from '@prisma/client'

interface Props {
    item: Band
}

export default function BandRow({ item }: Props) {
    return (
        <tr>
            <td>{item.name}</td>
            {item.website && <td>{item.website}</td>}
            {item.instagramHandle && <td>{item.instagramHandle}</td>}
        </tr>
    )
}
