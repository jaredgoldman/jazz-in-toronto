import { useMemo, useState } from 'react'
import { api } from '~/utils/api'
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    SortingState,
    getSortedRowModel
} from '@tanstack/react-table'
import { Venue } from '~/types/data'
import { Table, Box } from '@radix-ui/themes'
import { HeaderCell } from './components'
import Loading from '../Loading'

export function VenuesTable() {
    const { data, isFetched, isLoading } = api.venue.getAll.useQuery()

    const columns = useMemo<ColumnDef<Venue>[]>(
        () => [
            {
                accessorKey: 'name',
                cell: (info) => info.getValue(),
                header: () => <span>Name</span>
            },
            {
                accessorKey: 'address',
                cell: (info) => info.getValue(),
                header: () => <span>Address</span>
            },
            {
                accessorKey: 'city',
                cell: (info) => info.getValue(),
                header: () => <span>City</span>
            },
            {
                accessorKey: 'website',
                cell: (info) => info.getValue(),
                header: () => <span>Website</span>
            },
            {
                accessorKey: 'active',
                cell: (info) => info.getValue()?.toString(),
                header: () => <span>Active</span>
            },
            {
                accessorKey: 'instagramHandle',
                cell: (info) => info.getValue(),
                header: () => <span>Instagram</span>
            },
            {
                accessorKey: 'featured',
                cell: (info) => info.getValue()?.toString(),
                header: () => <span>Featured</span>
            }
        ],
        []
    )

    const [sorting, setSorting] = useState<SortingState>([])

    const table = useReactTable<Venue>({
        data: data ?? [],
        columns,
        state: { sorting },
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting
    })

    return (
        <Box>
            {data?.length && (
                <Table.Root>
                    <Table.Header>
                        {table.getHeaderGroups().map((headerGroup) => (
                            /*iterate through headers*/
                            <Table.Row key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <HeaderCell header={header} />
                                ))}
                            </Table.Row>
                        ))}
                    </Table.Header>
                    <Table.Body>
                        {table.getRowModel().rows.map((row) => (
                            /*iterate through cells*/
                            <Table.Row key={row.id}>
                                {row
                                    .getVisibleCells()
                                    .map((cell) =>
                                        (
                                            <Table.Cell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </Table.Cell>
                                        )
                                    )}
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            )}
            {isFetched && !data?.length && <div>Empty state placeholder</div> }
            {isLoading && <Loading/>}
        </Box>
    )
}
