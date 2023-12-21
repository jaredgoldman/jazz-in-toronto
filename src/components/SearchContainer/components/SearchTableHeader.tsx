import { Table } from '@radix-ui/themes'

interface Props {
    cols: Array<{ label?: string | null; key: string }>
    showFeatured?: boolean
}

export default function SearchTableHeader({
    cols,
    showFeatured = true
}: Props): JSX.Element {
    return (
        <Table.Header>
            <Table.Row align="center">
                {cols.map((col) => {
                    if (col.label === 'Featured' && !showFeatured) {
                        return null
                    }
                    return (
                        <Table.ColumnHeaderCell key={col.label}>
                            {col.label}
                        </Table.ColumnHeaderCell>
                    )
                })}
            </Table.Row>
        </Table.Header>
    )
}
