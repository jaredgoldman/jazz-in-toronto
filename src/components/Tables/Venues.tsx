import { useMemo, useState } from 'react'
import { api } from '~/utils/api'
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    SortingState,
    getSortedRowModel,
    getFilteredRowModel,
    ColumnFiltersState
} from '@tanstack/react-table'
import { Venue } from '~/types/data'
import { Table, Box, Flex } from '@radix-ui/themes'
import { HeaderCell } from './components'
import Loading from '../Loading'
import { fuzzyFilter } from './utils/filters'
import { PaginationButtonGroup } from './components/PaginationButtonGroup'

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
                accessorKey: 'instagramHandle',
                cell: (info) => info.getValue(),
                header: () => <span>Instagram</span>
            },
            {
                accessorKey: 'active',
                cell: (info) => info.getValue()?.toString(),
                header: () => <span>Active</span>,
                enableColumnFilter: false
            },
            {
                accessorKey: 'featured',
                cell: (info) => info.getValue()?.toString(),
                header: () => <span>Featured</span>,
                enableColumnFilter: false
            }
        ],
        []
    )

    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

    const table = useReactTable<Venue>({
        data: data ?? [],
        columns,
        state: { sorting, columnFilters },
        filterFns: {
            fuzzy: fuzzyFilter
        },
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel()
    })

    return (
        <Box>
            {data?.length && (
                <>
                    <Table.Root variant="surface">
                        <Table.Header>
                            {table.getHeaderGroups().map((headerGroup) => (
                                /*iterate through headers*/
                                <Table.Row key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <HeaderCell
                                            header={header}
                                            key={header.id}
                                        />
                                    ))}
                                </Table.Row>
                            ))}
                        </Table.Header>
                        <Table.Body>
                            {table.getRowModel().rows.map((row) => (
                                /*iterate through cells*/
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
                    {table.getPageCount() > 1 && (
                        <Flex justify="center" mt="4">
                            <PaginationButtonGroup table={table} />
                        </Flex>
                    )}
                </>
            )}
            {isFetched && !data?.length && <div>Empty state placeholder</div>}
            {isLoading && <Loading />}
        </Box>
    )
}
