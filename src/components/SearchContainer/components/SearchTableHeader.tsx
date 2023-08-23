import { Table } from '@radix-ui/themes'

interface Props {
    cols: Array<{ label?: string | null; key: string }>
}

export default function SearchTableHeader({ cols }: Props): JSX.Element {
    return (
        <Table.Header>
            <Table.Row align="center">
                {cols.map((col) => (
                    <Table.ColumnHeaderCell key={col.label}>
                        {col.label}
                    </Table.ColumnHeaderCell>
                ))}
            </Table.Row>
        </Table.Header>
    )
}
