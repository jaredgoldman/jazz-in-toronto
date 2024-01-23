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
    getPaginationRowModel,
    createColumnHelper
} from '@tanstack/react-table'
import { Table, Box, Flex, Text } from '@radix-ui/themes'
import Loading from '../Loading'
import { fuzzyFilter } from './utils/filters'
import { PaginationButtonGroup } from './components/PaginationButtonGroup'
import { useRouter } from 'next/router'
import { TableActionMenu } from './components/TableActionMenu'
import FadeOutText from '../FadeOutText'

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
            setFeaturedMutation(
                { id: artist.id },
                {
                    onSuccess: () => {
                        setError(null)
                        void refetch()
                    },
                    onError: (e) => {
                        setError(
                            'Setting featured artist failed. Please try again later.'
                        )
                        console.error(e)
                    }
                }
            )
        },
        [setFeaturedMutation, refetch]
    )

    const handleDelete = useCallback(
        (artist: Artist) => {
            deleteMutation(
                { id: artist.id },
                {
                    onSuccess: () => {
                        setError(null)
                        void refetch()
                    },
                    onError: (e) => {
                        setError(
                            'Delete artist failed. Please try again later.'
                        )
                        console.error(e)
                    }
                }
            )
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

    const table = useReactTable({
        initialState: {
            pagination: {
                pageSize: 10,
                pageIndex: 0
            }
        },
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
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel()
    })

    return (
        <Box>
            {setFeaturedIsSuccess ? (
                <FadeOutText>
                    <Text color="green" size="2" align="center">
                        Artist successfully set as featured
                    </Text>
                </FadeOutText>
            ) : null}
            {deleteMutationIsSuccess ? (
                <FadeOutText>
                    <Text color="red" size="2" align="center">
                        Artist has been deleted
                    </Text>
                </FadeOutText>
            ) : null}
            {error ? (
                <FadeOutText>
                    <Text color="yellow" size="2" align="center">
                        {error}
                    </Text>
                </FadeOutText>
            ) : null}
            {data?.length && (
                <>
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
