import { useState } from 'react'
import { Button, Table } from '@radix-ui/themes'

interface Props {
    cols: Array<{ label?: string | null; key: string }>
    showFeatured?: boolean
    onSort: (key: string, ascending?: boolean) => void
}


export default function SearchTableHeader({
    cols,
    showFeatured = true,
    onSort
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
                            <Button onClick={() => onSort(col.key)}>
                                sort
                            </Button>
                        </Table.ColumnHeaderCell>
                    )
                })}
            </Table.Row>
        </Table.Header>
    )
}
