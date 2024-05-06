import { useCallback, useState } from 'react'
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
import { EventWithArtistVenue } from '~/types/data'
import { Table, Flex, Badge, Heading } from '@radix-ui/themes'
import { format } from 'date-fns'
import { useMemo } from 'react'
import Loading from '../Loading'
import { HeaderCell, TableActionMenu } from './components'
import { dateFilter, fuzzyFilter, timeFilter } from './utils/filters'
import { useRouter } from 'next/router'
import { useToast } from '~/hooks/useToast'
import { Button } from '@radix-ui/themes'
import { PaginationButtonGroup } from './components/PaginationButtonGroup'

const columnHelper = createColumnHelper<EventWithArtistVenue>()

export function EventsTable() {
    const { toast } = useToast()
    const router = useRouter()

    /*
     * Queries/Mutations
     */
    const setFeaturedMutation = api.event.setFeatured.useMutation()
    const deleteMutation = api.event.delete.useMutation()
    const approveMutation = api.event.approve.useMutation()
    const getAllEventsQuery = api.event.getAll.useQuery({
        showUnapproved: true
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

    /*
     * Table setup
     */
    const columns = useMemo(
        () => [
            columnHelper.accessor((row) => row.startDate, {
                cell: (info) => format(new Date(info.getValue()), 'MM/dd/yyyy'),
                filterFn: 'date',
                header: 'Date'
            }),
            columnHelper.accessor((row) => row.name, {
                cell: (info) => info.getValue(),
                header: 'Event'
            }),
            columnHelper.accessor((row) => row.venue.name, {
                cell: (info) => info.getValue(),
                header: 'Venue'
            }),
            columnHelper.accessor((row) => row.startDate, {
                cell: (info) => format(new Date(info.getValue()), 'h:mm a'),
                header: 'Start',
                filterFn: 'time'
            }),
            columnHelper.accessor((row) => row.endDate, {
                cell: (info) => format(new Date(info.getValue()), 'h:mm a'),
                header: 'End',
                filterFn: 'time'
            }),
            columnHelper.accessor((row) => row.artist.name, {
                cell: (info) => info.getValue(),
                header: 'Artist'
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
                        onClick={() => handleCopyClick(row.original)}
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
            columnFilters
        },
        filterFns: {
            fuzzy: fuzzyFilter,
            date: dateFilter,
            time: timeFilter
        },
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
        <Flex direction="column">
            <Flex justify="end" align="end" mb="4">
                <Button
                    size="4"
                    variant="outline"
                    onClick={() => handleEditClick()}
                >
                    Add New Event
                </Button>
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
            {getAllEventsQuery.isFetching &&
                !table.getFilteredRowModel().rows.length && (
                    <Flex justify="center" align="center" py="7">
                        <Heading>No events found</Heading>
                    </Flex>
                )}
            {getAllEventsQuery.isLoading && <Loading />}
        </Flex>
    )
}
