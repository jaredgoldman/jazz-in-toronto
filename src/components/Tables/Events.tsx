import { useCallback, useState, useEffect } from 'react'
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
    getPaginationRowModel,
    RowSelectionState
} from '@tanstack/react-table'
import { EventWithArtistVenue } from '~/types/data'
import { Table, Flex, Badge, Heading, Text, Checkbox } from '@radix-ui/themes'
import { useMemo } from 'react'
import Loading from '../Loading'
import { HeaderCell, TableActionMenu } from './components'
import { dateFilter, fuzzyFilter, timeFilter } from './utils/filters'
import { useRouter } from 'next/router'
import { useToast } from '~/hooks/useToast'
import { Button } from '@radix-ui/themes'
import { PaginationButtonGroup } from './components/PaginationButtonGroup'
import { DateTime } from 'luxon'
import { formatTime } from '~/utils'
import { ConfirmActionDialogue } from '../ConfirmActionDialogue'
import { useLocalStorage, useDebounce } from '~/hooks'

const columnHelper = createColumnHelper<EventWithArtistVenue>()

export function EventsTable() {
    const { toast } = useToast()
    const router = useRouter()
    const defaultDate = DateTime.now()
        .startOf('day')
        .setZone('America/New_York')
        .toJSDate()
    /*
     * State
     */
    const [useStart, setUseStart] = useState(true)
    const [alertDialogOpen, setAlertDialogueOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
    const [sorting, setSorting] = useState<SortingState>([
        { id: 'Featured', desc: true },
        { id: 'Approved', desc: false }
    ])

    /*
     * Local storage access for column filter state
     */
    const [localStorage, setLocalStorage] = useLocalStorage<ColumnFiltersState>(
        router.asPath,
        []
    )
    const [columnFilters, setColumnFilters] =
        useState<ColumnFiltersState>(localStorage)
    const [initialLoad, setInitialLoad] = useState(true)

    // Use the debounce hook
    const debouncedColumnFilters = useDebounce(columnFilters, 1000)

    useEffect(() => {
        if (initialLoad) {
            setInitialLoad(false)
        } else {
            setLocalStorage(debouncedColumnFilters)
        }
    }, [debouncedColumnFilters, setLocalStorage, initialLoad])

    const handleClearFilters = useCallback(() => setColumnFilters([]), [setColumnFilters])
    /*
     * Queries/Mutations
     */
    const setFeaturedMutation = api.event.setFeatured.useMutation()
    const deleteMutation = api.event.delete.useMutation()
    const deleteManyMutation = api.event.deleteMany.useMutation()
    const approveMutation = api.event.approve.useMutation()
    const approveManyMutation = api.event.approveMany.useMutation()
    const getAllEventsQuery = api.event.getAll.useQuery({
        showUnapproved: true,
        start: useStart ? defaultDate : undefined
    })

    /*
     * Actions
     */
    const handleEditClick = useCallback(
        async (event?: EventWithArtistVenue) => {
            const params = new URLSearchParams()
            if (event) params.set('id', event.id)
            await router.push(
                {
                    pathname: '/admin/event',
                    query: params.toString()
                },
                undefined,
                {
                    shallow: true
                }
            )
        },
        [router]
    )

    const handleBatchEditClick = useCallback(() => {
        setAlertDialogueOpen(true)
    }, [setAlertDialogueOpen])

    const handleApprove = useCallback(
        (event: EventWithArtistVenue) => {
            approveMutation.mutate(
                { id: event.id, approved: !event.approved },
                {
                    onSuccess: () => {
                        toast({
                            title: 'Success',
                            message: 'Event approved'
                        })
                        void getAllEventsQuery.refetch()
                    },
                    onError: () => {
                        toast({
                            title: 'Error',
                            message: 'Approving event failed',
                            type: 'error'
                        })
                    }
                }
            )
        },
        [approveMutation, toast, getAllEventsQuery]
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
                void getAllEventsQuery.refetch()
            },
            onError: () => {
                toast({
                    title: 'Error',
                    message: 'Approving events failed',
                    type: 'error'
                })
            }
        })
    }, [approveManyMutation, rowSelection, toast, getAllEventsQuery])

    const handleToggleFeatured = useCallback(
        (event: EventWithArtistVenue) => {
            setFeaturedMutation.mutate(
                { id: event.id, featured: !event.featured },
                {
                    onSuccess: () => {
                        toast({
                            title: 'Success',
                            message: 'Featured event updated'
                        })
                        void getAllEventsQuery.refetch()
                    },
                    onError: () => {
                        toast({
                            title: 'Error',
                            message: 'Setting featured event failed',
                            type: 'error'
                        })
                    }
                }
            )
        },
        [setFeaturedMutation, getAllEventsQuery, toast]
    )

    const handleDelete = useCallback(
        (event: EventWithArtistVenue) => {
            deleteMutation.mutate(
                { id: event.id },
                {
                    onSuccess: () => {
                        void getAllEventsQuery.refetch()
                        toast({
                            title: 'Success',
                            message: 'Event deleted'
                        })
                    },
                    onError: () => {
                        toast({
                            title: 'Error',
                            message: 'Delete event failed',
                            type: 'error'
                        })
                    }
                }
            )
        },
        [deleteMutation, getAllEventsQuery, toast]
    )

    const handleDeleteMany = useCallback(() => {
        const selectedIds = Object.keys(rowSelection).filter(
            (id) => rowSelection[id]
        )
        deleteManyMutation.mutate(selectedIds, {
            onSuccess: () => {
                toast({
                    title: 'Success',
                    message: 'Events deleted'
                })
                void getAllEventsQuery.refetch()
            },
            onError: () => {
                toast({
                    title: 'Error',
                    message: 'Deleting events failed',
                    type: 'error'
                })
            }
        })
    }, [deleteManyMutation, rowSelection, toast, getAllEventsQuery])



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
            columnHelper.accessor((row) => row.startDate, {
                cell: (info) => formatTime(info.getValue(), 'MM/dd/yyyy'),
                filterFn: 'date',
                header: 'Date'
            }),
            columnHelper.accessor((row) => row.name, {
                cell: (info) => info.getValue(),
                header: 'Event'
            }),
            columnHelper.accessor((row) => row.artist.name, {
                cell: (info) => info.getValue(),
                header: 'Artist'
            }),
            columnHelper.accessor((row) => row.venue.name, {
                cell: (info) => info.getValue(),
                header: 'Venue'
            }),
            columnHelper.accessor((row) => row.startDate, {
                cell: (info) => formatTime(new Date(info.getValue())),
                header: 'Start',
                filterFn: 'time'
            }),
            columnHelper.accessor((row) => row.endDate, {
                cell: (info) => formatTime(new Date(info.getValue())),
                header: 'End',
                filterFn: 'time'
            }),
            columnHelper.accessor((row) => row.venue.website, {
                cell: (info) => info.getValue(),
                header: 'Website'
            }),
            columnHelper.accessor((row) => row.venue.instagramHandle, {
                cell: (info) => info.getValue(),
                header: 'Instagram'
            }),
            columnHelper.accessor((row) => row.cancelled, {
                header: 'Cancelled',
                cell: (info) =>
                    !info.renderValue() ? (
                        <Badge color="green">Not Cancelled</Badge>
                    ) : (
                        <Badge variant="soft" color="gray">
                            Cancelled
                        </Badge>
                    ),
                enableColumnFilter: false
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

    const table = useReactTable<EventWithArtistVenue>({
        data: getAllEventsQuery.data ?? [],
        columns,
        initialState: {
            pagination: {
                pageSize: 25,
                pageIndex: 0
            }
        },
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

    const shouldShowBatchButtons = useMemo(
        () => Object.values(rowSelection).length > 0,
        [rowSelection]
    )

    /*
     * Rendering
     */
    return (
        <Flex direction="column">
            <Flex justify="between" align="center" mb="4" gap="4">
                <Flex gap="3">
                    <Checkbox
                        size="2"
                        onCheckedChange={(e) => setUseStart(e as boolean)}
                        checked={useStart}
                    />
                    <Text>Only fetch upcoming events</Text>
                </Flex>
                <Flex gap="4">
                    {shouldShowBatchButtons ? (
                        <>
                            <Button
                                color="amber"
                                size="3"
                                variant="outline"
                                onClick={handleBatchEditClick}
                            >
                                Approve Selected
                            </Button>
                            <Button color="red" size="3" variant="outline" onClick={() => setDeleteDialogOpen(true)}>
                                Delete Selected
                            </Button>
                        </>
                    ) : null}
                    {Object.values(columnFilters).length ? (
                        <Button color="amber" size="3" variant="outline" onClick={handleClearFilters}>
                            Clear Filters
                        </Button>
                    ) : null}
                    <Button
                        size="3"
                        variant="outline"
                        onClick={() => handleEditClick()}
                    >
                        Add New Event
                    </Button>
                </Flex>
            </Flex>
            {getAllEventsQuery.data?.length ? (
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
            ) : null}
            {getAllEventsQuery.isFetched &&
                !table.getFilteredRowModel().rows.length && (
                    <Flex justify="center" align="center" py="7">
                        <Heading>No events found</Heading>
                    </Flex>
                )}
            {getAllEventsQuery.isLoading && <Loading />}
            <ConfirmActionDialogue
                open={alertDialogOpen}
                setOpen={setAlertDialogueOpen}
                onAction={handleApproveMany}
                label="Batch approve?"
                description="Are you sure you want to approve all selected events?"
                actionButtonLabel="Approve all"
                level="warn"
            />
            <ConfirmActionDialogue
                open={deleteDialogOpen}
                setOpen={setDeleteDialogOpen}
                onAction={handleDeleteMany}
                label="Batch delete?"
                description="Are you sure you want to delete all selected events?"
                actionButtonLabel="Delete all"
                level="error"
            />
        </Flex>
    )
}
