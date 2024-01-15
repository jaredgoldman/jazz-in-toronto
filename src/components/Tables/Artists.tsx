import { Box, Table, Text } from '@radix-ui/themes'
import {
    ColumnFiltersState,
    SortingState,
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable
} from '@tanstack/react-table'
import { useRouter } from 'next/router'
import { useCallback, useMemo, useState } from 'react'
import { Artist } from '~/types/data'
import { api } from '~/utils/api'
import Loading from '../Loading'
import { HeaderCell } from './components'
import { TableActionMenu } from './components/TableActionMenu'
import { fuzzyFilter } from './utils/filters'

const columnHelper = createColumnHelper<Artist>()

export function ArtistsTable() {
    const { data, isFetched, isLoading, refetch } = api.artist.getAll.useQuery()
    const router = useRouter()
    const { mutate: setFeaturedMutation, isSuccess: setFeaturedIsSuccess } =
        api.artist.setFeatured.useMutation()
    const { mutate: deleteMutation, isSuccess: deleteMutationIsSuccess } =
        api.artist.delete.useMutation()
    const [error, setError] = useState<string | null>(null)

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

    const handleToggleFeatured = useCallback(
        (artist: Artist) => {
            try {
                setFeaturedMutation(
                    { id: artist.id },
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
        (artist: Artist) => {
            try {
                deleteMutation(
                    { id: artist.id },
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
            columnHelper.accessor((row) => row.genre, {
                cell: (info) => info.getValue(),
                header: 'Genre'
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
                cell: (info) => info.renderValue()?.toString(),
                header: 'Active',
                enableColumnFilter: false
            }),
            columnHelper.accessor((row) => row.featured, {
                cell: (info) => info.renderValue()?.toString(),
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
            {setFeaturedIsSuccess ? (
                <Text color="green" size="2" align="center">
                    Artist successfully set as featured
                </Text>
            ) : null}
            {deleteMutationIsSuccess ? (
                <Text color="red" size="2" align="center">
                    Artist has been deleted
                </Text>
            ) : null}
            {/*TODO: This doesn't work*/}
            {error ? (
                <Text color="yellow" size="2" align="center">
                    {error}
                </Text>
            ) : null}
            {data?.length ? (
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
            ) : null}
            {isFetched && !data?.length && <div>Empty state placeholder</div>}
            {isLoading && <Loading />}
        </Box>
    )
}
