import { useMemo, useState } from 'react'
import { api } from '~/utils/api'
import { Artist } from '~/types/data'
import { HeaderCell } from './components'
import {
    ColumnDef,
    SortingState,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getSortedRowModel
} from '@tanstack/react-table'
import { Table, Box } from '@radix-ui/themes'
import Loading from '../Loading'

export function ArtistsTable() {
    const { data, isFetched, isLoading } = api.artist.getAll.useQuery()

    const columns = useMemo<ColumnDef<Artist>[]>(
        () => [
            {
                accessorKey: 'name',
                cell: (info) => info.getValue(),
                header: () => <span>Name</span>
            },
            {
                accessorKey: 'genre',
                cell: (info) => info.getValue(),
                header: () => <span>Genre</span>
            },
            {
                accessorKey: 'website',
                cell: (info) => info.getValue(),
                header: () => <span>Website</span>
            },
            {
                accessorKey: 'instagramHandle',
                cell: (info) => info.getValue(),
                header: () => <span>Instagram Handle</span>
            },
            {
                accessorKey: 'active',
                cell: (info) => info.renderValue()?.toString(),
                header: () => <span>Active</span>
            },
            {
                accessorKey: 'featured',
                cell: (info) => info.renderValue()?.toString(),
                header: () => <span>Featured</span>
            }
        ],
        []
    )

    const [sorting, setSorting] = useState<SortingState>([])

    const table = useReactTable<Artist>({
        data: data ?? [],
        columns,
        state: {
            sorting
        },
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting
    })

    return (
        <Box>
            {data?.length && (
                <Table.Root variant="surface">
                    <Table.Header>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <Table.Row key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <HeaderCell header={header} />
                                ))}
                            </Table.Row>
                        ))}
                    </Table.Header>
                    <Table.Body>
                        {table.getRowModel().rows.map((row) => (
                            <Table.Row key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <Table.Cell key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </Table.Cell>
                                ))}
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            )}
            {isFetched && !data?.length && <div>Empty state placeholder</div>}
            {isLoading && <Loading />}
        </Box>
    )
}
