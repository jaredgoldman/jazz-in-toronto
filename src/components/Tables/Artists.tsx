import { useCallback, useMemo, useState } from 'react'
import { api } from '~/utils/api'
import { Artist } from '~/types/data'
import { HeaderCell } from './components'
import {
    SortingState,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getSortedRowModel,
    getFilteredRowModel,
    ColumnFiltersState,
    createColumnHelper
} from '@tanstack/react-table'
import { Table, Box, Button } from '@radix-ui/themes'
import Loading from '../Loading'
import { fuzzyFilter } from './utils/filters'
import { useRouter } from 'next/router'

const columnHelper = createColumnHelper<Artist>()

export function ArtistsTable() {
    const { data, isFetched, isLoading } = api.artist.getAll.useQuery()
    //fetch data and set loading state
    const router = useRouter()

    const handleEditClick = useCallback(
        async (artist: Artist) => {
            const params = new URLSearchParams()
            params.set('id', artist.id)
            await router.push(
                {
                    pathname: '/admin/edit-artist',
                    query: params.toString()
                },
                undefined,
                { shallow: true }
            )
        },
        [router]
    )

    const columns = useMemo(
        () => [
            columnHelper.accessor((row) => row.name, {
                cell: (info) => info.getValue(),
                header: 'Name'
            }),
            columnHelper.accessor((row) => row.name, {
                cell: (info) => info.getValue(),
                header: 'Genre'
            }),
            columnHelper.accessor((row) => row.name, {
                cell: (info) => info.getValue(),
                header: 'Website'
            }),
            columnHelper.accessor((row) => row.name, {
                cell: (info) => info.getValue(),
                header: 'Instagram'
            }),
            columnHelper.accessor((row) => row.name, {
                cell: (info) => info.renderValue()?.toString(),
                header: 'Active',
                enableColumnFilter: false
            }),
            columnHelper.accessor((row) => row.name, {
                cell: (info) => info.renderValue()?.toString(),
                header: 'Featured',
                enableColumnFilter: false
            }),
            columnHelper.display({
                id: 'edit',
                cell: ({ row }) => {
                    return (
                        <>
                            <Button
                                onClick={() =>
                                    void handleEditClick(row.original)
                                }
                            >
                                Edit
                            </Button>
                        </>
                    )
                },
                header: 'Edit'
            })
        ],
        [handleEditClick]
    )

    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

    const table = useReactTable<Artist>({
        data: data ?? [],
        columns,
        state: {
            sorting,
            columnFilters
        },
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
                <Table.Root variant="surface">
                    <Table.Header>
                        {table.getHeaderGroups().map((headerGroup) => (
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
