import { useCallback, useMemo, useState } from 'react'
import { api } from '~/utils/api'
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    SortingState,
    getSortedRowModel,
    getFilteredRowModel,
    ColumnFiltersState,
    createColumnHelper
} from '@tanstack/react-table'
import { Venue } from '~/types/data'
import { Table, Box, Text } from '@radix-ui/themes'
import { HeaderCell } from './components'
import Loading from '../Loading'
import { fuzzyFilter } from './utils/filters'
import { useRouter } from 'next/router'
import { TableActionMenu } from './components/TableActionMenu'

const columnHelper = createColumnHelper<Venue>()

export function VenuesTable() {
    const { data, isFetched, isLoading, refetch } = api.venue.getAll.useQuery()
    const router = useRouter()
    const { mutate: setFeaturedMutation, isSuccess: setFeaturedIsSuccess } =
        api.venue.setFeatured.useMutation()
    const { mutate: deleteMutation, isSuccess: deleteMutationIsSuccess } =
        api.venue.delete.useMutation()
    const [error, setError] = useState<string | null>(null)

    const handleEditClick = useCallback(
        async (venue: Venue) => {
            const params = new URLSearchParams()
            params.set('id', venue.id)
            await router.push(
                {
                    pathname: '/admin/edit-venue',
                    query: params.toString()
                },
                undefined,
                { shallow: true }
            )
        },
        [router]
    )

    const handleToggleFeatured = useCallback(
        (venue: Venue) => {
            try {
                setFeaturedMutation(
                    { id: venue.id },
                    {
                        onSuccess: () => {
                            void refetch()
                        }
                    }
                )
            } catch (e) {
                setError(
                    'Toggle featured failed. There was an error altering the database.'
                )
            }
        },
        [setFeaturedMutation, refetch]
    )

    const handleDelete = useCallback(
        (venue: Venue) => {
            try {
                deleteMutation(
                    { id: venue.id },
                    {
                        onSuccess: () => {
                            void refetch()
                        }
                    }
                )
            } catch (e) {
                setError(
                    'Delete failed. There was an error altering the database.'
                )
                console.error(e)
            }
        },
        [deleteMutation, refetch]
    )

    const columns = useMemo(
        () => [
            columnHelper.accessor((row) => row.name, {
                cell: (info) => info.getValue(),
                header: 'Name'
            }),
            columnHelper.accessor((row) => row.address, {
                cell: (info) => info.getValue(),
                header: 'Address'
            }),
            columnHelper.accessor((row) => row.city, {
                cell: (info) => info.getValue(),
                header: 'City'
            }),
            columnHelper.accessor((row) => row.website, {
                cell: (info) => info.getValue(),
                header: 'Website'
            }),
            columnHelper.accessor((row) => row.instagramHandle, {
                cell: (info) => info.getValue(),
                header: 'Instagram'
            }),
            columnHelper.accessor((row) => row.active, {
                cell: (info) => info.getValue()?.toString(),
                header: 'Active',
                enableColumnFilter: false
            }),
            columnHelper.accessor((row) => row.featured, {
                cell: (info) => info.getValue()?.toString(),
                header: 'Featured',
                enableColumnFilter: false
            }),
            columnHelper.display({
                id: 'edit',
                cell: ({ row }) => (
                    <TableActionMenu
                        isFeatured={row.original.featured}
                        onToggleFeatured={() => {
                            handleToggleFeatured(row.original)
                        }}
                        onEdit={() => handleEditClick(row.original)}
                        onDelete={() => handleDelete(row.original)}
                    />
                ),
                header: 'Edit'
            })
        ],
        [handleDelete, handleEditClick, handleToggleFeatured]
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
            {setFeaturedIsSuccess ? (
                <Text color="green" size="2" align="center">
                    Venue successfully set as featured
                </Text>
            ) : null}
            {deleteMutationIsSuccess ? (
                <Text color="red" size="2" align="center">
                    Venue has been deleted
                </Text>
            ) : null}
            {data?.length ? (
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
            ) : null}
            {isFetched && !data?.length && <div>Empty state placeholder</div>}
            {isLoading && <Loading />}
        </Box>
    )
}
