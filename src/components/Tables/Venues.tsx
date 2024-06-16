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
    createColumnHelper,
    getPaginationRowModel
} from '@tanstack/react-table'
import { Venue } from '~/types/data'
import {
    Table,
    Box,
    Flex,
    Badge,
    Button,
    Heading,
    Checkbox
} from '@radix-ui/themes'
import { HeaderCell, TableActionMenu } from './components'
import Loading from '../Loading'
import { dateFilter, fuzzyFilter, timeFilter } from './utils/filters'
import { PaginationButtonGroup } from './components/PaginationButtonGroup'
import { useRouter } from 'next/router'
import { useToast } from '~/hooks/useToast'
import { ConfirmActionDialogue } from '../ConfirmActionDialogue'

const columnHelper = createColumnHelper<Venue>()

export function VenuesTable() {
    const router = useRouter()
    const { toast } = useToast()
    const [alertDialogOpen, setAlertDialogueOpen] = useState(false)

    /*
     * Queries/Mutations
     */
    const setFeaturedMutation = api.venue.setFeatured.useMutation()
    const approveVenueMutation = api.venue.approve.useMutation()
    const approveManyMutation = api.venue.approveMany.useMutation()
    const deleteVenueMutation = api.venue.delete.useMutation()
    const getAllVenuesQuery = api.venue.getAll.useQuery(
        {
            showUnapproved: true
        },
        {
            refetchOnWindowFocus: false,
            refetchOnMount: false
        }
    )

    /*
     * Actions
     */
    const handleEditClick = useCallback(
        async (venue?: Venue) => {
            const params = new URLSearchParams()
            if (venue) params.set('id', venue.id)
            await router.push(
                {
                    pathname: '/admin/venue',
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

    const handleApprove = useCallback(
        (venue: Venue) => {
            approveVenueMutation.mutate(
                { id: venue.id, approved: !venue.approved },
                {
                    onSuccess: () => {
                        void getAllVenuesQuery.refetch()
                        toast({
                            title: 'Success',
                            message: 'Venue has been approved'
                        })
                    },
                    onError: () =>
                        toast({
                            title: 'Error',
                            message: 'Approve venue failed',
                            type: 'error'
                        })
                }
            )
        },
        [approveVenueMutation, getAllVenuesQuery, toast]
    )

    const handleApproveMany = useCallback(() => {
        const selectedIds = Object.keys(rowSelection).filter(
            (id) => rowSelection[id]
        )
        approveManyMutation.mutate(selectedIds, {
            onSuccess: () => {
                toast({
                    title: 'Success',
                    message: 'Events approved'
                })
                void getAllVenuesQuery.refetch()
            },
            onError: () => {
                toast({
                    title: 'Error',
                    message: 'Approving events failed',
                    type: 'error'
                })
            }
        })
    }, [approveManyMutation])

    const handleToggleFeatured = useCallback(
        (venue: Venue) => {
            setFeaturedMutation.mutate(
                { id: venue.id, featured: !venue.featured },
                {
                    onSuccess: () => {
                        void getAllVenuesQuery.refetch()
                        toast({
                            title: 'Success',
                            message: 'Venue successfully set as featured'
                        })
                    },
                    onError: () =>
                        toast({
                            title: 'Error',
                            message: 'Setting featured venue failed',
                            type: 'error'
                        })
                }
            )
        },
        [setFeaturedMutation, getAllVenuesQuery, toast]
    )

    const handleDelete = useCallback(
        (venue: Venue) => {
            deleteVenueMutation.mutate(
                { id: venue.id },
                {
                    onSuccess: () => {
                        void getAllVenuesQuery.refetch()
                        toast({
                            title: 'Success',
                            message: 'Venue has been deleted'
                        })
                    },
                    onError: () =>
                        toast({
                            title: 'Error',
                            message: 'Delete venue failed',
                            type: 'error'
                        })
                }
            )
        },
        [deleteVenueMutation, getAllVenuesQuery, toast]
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
                header: 'Name',
                filterFn: 'fuzzy'
            }),
            columnHelper.accessor((row) => row.address, {
                cell: (info) => info.getValue().split(',')[0],
                header: 'Address',
                filterFn: 'fuzzy'
            }),
            columnHelper.accessor((row) => row.city, {
                cell: (info) => info.getValue(),
                header: 'City',
                filterFn: 'fuzzy'
            }),
            columnHelper.accessor((row) => row.website, {
                cell: (info) => info.getValue(),
                header: 'Website',
                filterFn: 'fuzzy'
            }),
            columnHelper.accessor((row) => row.instagramHandle, {
                cell: (info) => info.getValue(),
                header: 'Instagram',
                filterFn: 'fuzzy'
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
                        isFeatured={row.original.featured}
                        isApproved={row.original.approved}
                        onToggleFeatured={() => {
                            handleToggleFeatured(row.original)
                        }}
                        onEdit={() => handleEditClick(row.original)}
                        onDelete={() => handleDelete(row.original)}
                        onApprove={() => handleApprove(row.original)}
                    />
                )
            })
        ],
        [handleDelete, handleEditClick, handleToggleFeatured, handleApprove]
    )

    const [sorting, setSorting] = useState<SortingState>([
        { id: 'Featured', desc: true },
        { id: 'Approved', desc: false }
    ])

    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

    const table = useReactTable<Venue>({
        data: getAllVenuesQuery.data ?? [],
        columns,
        initialState: {
            pagination: {
                pageSize: 25,
                pageIndex: 0
            }
        },
        state: { sorting, columnFilters, rowSelection },
        filterFns: {
            fuzzy: fuzzyFilter,
            date: dateFilter,
            time: timeFilter
        },
        enableRowSelection: true,
        enableMultiRowSelection: true,
        getRowId: (row) => row.id,
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
                <Button
                    variant="outline"
                    size="4"
                    onClick={() => handleEditClick()}
                >
                    Add New Venue
                </Button>
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
            </Flex>
            {getAllVenuesQuery.data?.length ? (
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
            ) : null}
            {!getAllVenuesQuery.isFetching &&
                !table.getFilteredRowModel().rows.length && (
                    <Flex justify="center" align="center" py="7">
                        <Heading>No venues found</Heading>
                    </Flex>
                )}
            {getAllVenuesQuery.isLoading && <Loading />}
            <ConfirmActionDialogue
                open={alertDialogOpen}
                setOpen={setAlertDialogueOpen}
                onAction={handleApproveMany}
                label="Batch approve?"
                description="Are you sure you want to approve all selected venues?"
                actionButtonLabel="Approve all"
                level="warn"
            />
        </Box>
    )
}
