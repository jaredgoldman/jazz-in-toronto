import { useCallback, useMemo, useState, useEffect } from 'react'
import { api } from '~/utils/api'
import { Artist } from '~/types/data'
import { HeaderCell } from './components'
import { genreLabels } from '~/utils/labels'
import {
    SortingState,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getSortedRowModel,
    getFilteredRowModel,
    ColumnFiltersState,
    getPaginationRowModel,
    createColumnHelper,
    RowSelectionState
} from '@tanstack/react-table'
import {
    Table,
    Box,
    Flex,
    Badge,
    Button,
    Heading,
    Checkbox
} from '@radix-ui/themes'
import Loading from '../Loading'
import { fuzzyFilter, timeFilter } from './utils/filters'
import { PaginationButtonGroup } from './components/PaginationButtonGroup'
import { useRouter } from 'next/router'
import { TableActionMenu } from './components/TableActionMenu'
import { useToast } from '~/hooks/useToast'
import { dateFilter } from './utils/filters'
import { ConfirmActionDialogue } from '../ConfirmActionDialogue'
import { useLocalStorage } from '~/hooks/useLocalStorage'

const columnHelper = createColumnHelper<Artist>()

export function ArtistsTable() {
    const { toast } = useToast()
    const router = useRouter()

    /*
     * State
     */
    const [alertDialogOpen, setAlertDialogueOpen] = useState(false)
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
    const [sorting, setSorting] = useState<SortingState>([
        { id: 'Featured', desc: true },
        { id: 'Approved', desc: false },
        { id: 'Name', desc: false }
    ])

    /*
     * Local storage access for column filter state
     */
    const [localStorage, setLocalStorge] = useLocalStorage<ColumnFiltersState>(
        router.asPath,
        []
    )
    const [columnFilters, setColumnFilters] =
        useState<ColumnFiltersState>(localStorage)

    useEffect(() => {
        setLocalStorge(columnFilters)
    }, [columnFilters])

    /*
     * Queries/Mutations
     */
    const approveArtistMutation = api.artist.approve.useMutation()
    const approveManyMutation = api.artist.approveMany.useMutation()
    const setFeaturedMutation = api.artist.setFeatured.useMutation()
    const deleteArtistMutation = api.artist.delete.useMutation()
    const getAllArtistsQuery = api.artist.getAll.useQuery({
        showUnapproved: true
    })

    /*
     * Actions
     */
    const handleEditClick = useCallback(
        async (artist?: Artist) => {
            const params = new URLSearchParams()
            if (artist) params.set('id', artist.id)
            await router.push(
                {
                    pathname: '/admin/artist',
                    query: params.toString()
                },
                undefined,
                { shallow: true }
            )
        },
        [router]
    )

    const handleBatchEditClick = useCallback(() => {
        setAlertDialogueOpen(true)
    }, [setAlertDialogueOpen])

    const hanldeApprove = useCallback(
        (artist: Artist) => {
            approveArtistMutation.mutate(
                { id: artist.id, approved: !artist.approved },
                {
                    onSuccess: () => {
                        void getAllArtistsQuery.refetch()
                        toast({
                            title: 'Success',
                            message: 'Artist has been approved'
                        })
                    },
                    onError: () => {
                        toast({
                            title: 'Error',
                            message: 'Approve artist failed',
                            type: 'error'
                        })
                    }
                }
            )
        },
        [getAllArtistsQuery, approveArtistMutation, toast]
    )

    const handleApproveMany = useCallback(() => {
        const selectedIds = Object.keys(rowSelection).filter(
            (id) => rowSelection[id]
        )
        approveManyMutation.mutate(selectedIds, {
            onSuccess: (data) => {
                console.log(data)
                toast({
                    title: 'Success',
                    message: 'Events approved'
                })
                void getAllArtistsQuery.refetch()
            },
            onError: () => {
                toast({
                    title: 'Error',
                    message: 'Approving events failed',
                    type: 'error'
                })
            }
        })
    }, [approveManyMutation, rowSelection, getAllArtistsQuery, toast])

    const handleToggleFeatured = useCallback(
        (artist: Artist) => {
            setFeaturedMutation.mutate(
                { id: artist.id, featured: !artist.featured },
                {
                    onSuccess: () => {
                        toast({
                            title: 'Success',
                            message: 'Artist successfully set as featured'
                        })
                        void getAllArtistsQuery.refetch()
                    },
                    onError: () =>
                        toast({
                            title: 'Error',
                            message: 'Setting featured artist failed',
                            type: 'error'
                        })
                }
            )
        },
        [setFeaturedMutation, getAllArtistsQuery, toast]
    )

    const handleDelete = useCallback(
        (artist: Artist) => {
            deleteArtistMutation.mutate(
                { id: artist.id },
                {
                    onSuccess: () => {
                        void getAllArtistsQuery.refetch()
                        toast({
                            title: 'Success',
                            message: 'Artist has been deleted'
                        })
                    },
                    onError: () => {
                        toast({
                            title: 'Error',
                            message: 'Delete artist failed',
                            type: 'error'
                        })
                    }
                }
            )
        },
        [deleteArtistMutation, getAllArtistsQuery, toast]
    )

    /*
     * Table setup
     */
    const columns = useMemo(
        () => [
            columnHelper.display({
                id: 'select',
                header: ({ table }) => (
                    <Checkbox
                        onCheckedChange={(checked) => {
                            const handler =
                                table.getToggleAllPageRowsSelectedHandler()
                            handler({ target: { checked } })
                        }}
                        checked={table.getIsAllPageRowsSelected()}
                    />
                ),
                cell: ({ row }) => {
                    return (
                        <Flex justify="center">
                            <Checkbox
                                checked={row.getIsSelected()}
                                onCheckedChange={(checked) => {
                                    const handler =
                                        row.getToggleSelectedHandler()
                                    handler({
                                        target: {
                                            checked
                                        }
                                    })
                                }}
                            />
                        </Flex>
                    )
                }
            }),
            columnHelper.accessor((row) => row.name, {
                cell: (info) => info.getValue(),
                header: 'Name'
            }),
            columnHelper.accessor((row) => row.genre, {
                cell: (info) => {
                    const genre = info.getValue()
                    if (!genre) return null
                    return genreLabels[genre]
                },
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
            columnHelper.accessor((row) => row.featured, {
                header: 'Featured',
                cell: (info) =>
                    info.renderValue() ? (
                        <Badge color="green">Featured</Badge>
                    ) : (
                        <Badge variant="soft" color="gray">
                            Not Featured
                        </Badge>
                    ),
                enableColumnFilter: false
            }),
            columnHelper.accessor((row) => row.approved, {
                cell: (info) =>
                    info.renderValue() ? (
                        <Badge color="green">Approved</Badge>
                    ) : (
                        <Badge color="blue">Not Approved</Badge>
                    ),
                header: 'Approved',
                enableColumnFilter: false
            }),
            columnHelper.display({
                id: 'edit',
                cell: ({ row }) => (
                    <TableActionMenu
                        isApproved={row.original.approved}
                        isFeatured={row.original.featured}
                        onToggleFeatured={() => {
                            handleToggleFeatured(row.original)
                        }}
                        onEdit={() => handleEditClick(row.original)}
                        onDelete={() => handleDelete(row.original)}
                        onApprove={() => hanldeApprove(row.original)}
                    />
                )
            })
        ],
        [handleDelete, handleEditClick, handleToggleFeatured, hanldeApprove]
    )

    const table = useReactTable({
        initialState: {
            pagination: {
                pageSize: 10,
                pageIndex: 0
            }
        },
        data: getAllArtistsQuery.data ?? [],
        columns,
        state: {
            sorting,
            columnFilters,
            rowSelection
        },
        filterFns: {
            fuzzy: fuzzyFilter,
            date: dateFilter,
            time: timeFilter
        },
        getRowId: (row) => row.id,
        enableRowSelection: true,
        enableMultiRowSelection: true,
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel()
    })

    /*
     * Rendering
     */
    return (
        <Box>
            <Flex justify="end" mb="4" gap="4">
                {Object.values(rowSelection).length ? (
                    <Button
                        color="amber"
                        size="4"
                        variant="outline"
                        onClick={handleBatchEditClick}
                    >
                        Approve All
                    </Button>
                ) : null}
                <Button
                    variant="outline"
                    size="4"
                    onClick={() => handleEditClick()}
                >
                    Add New Artist
                </Button>
            </Flex>
            {getAllArtistsQuery.data?.length && (
                <Flex gap="3" direction="column">
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
                </Flex>
            )}
            {getAllArtistsQuery.isFetched &&
                !table.getFilteredRowModel().rows.length && (
                    <Flex justify="center" align="center" py="7">
                        <Heading>No artists found</Heading>
                    </Flex>
                )}
            {getAllArtistsQuery.isLoading && <Loading />}
            <ConfirmActionDialogue
                open={alertDialogOpen}
                setOpen={setAlertDialogueOpen}
                onAction={handleApproveMany}
                label="Batch approve?"
                description="Are you sure you want to approve all selected artists?"
                actionButtonLabel="Approve all"
                level="warn"
            />
        </Box>
    )
}
