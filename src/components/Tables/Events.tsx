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
    createColumnHelper
} from '@tanstack/react-table'
import { EventWithArtistVenue } from '~/types/data'
import { Table, Flex, TextField, Heading, Badge } from '@radix-ui/themes'
import { format } from 'date-fns'
import { useMemo } from 'react'
import Loading from '../Loading'
import { HeaderCell, TableActionMenu } from './components'
import { fuzzyFilter } from './utils/filters'
import { useRouter } from 'next/router'
import { useToast } from '~/hooks/useToast'

const columnHelper = createColumnHelper<EventWithArtistVenue>()

export function EventsTable() {
    const { toast } = useToast()
    const router = useRouter()
    const [filteredDate, setFilteredDate] = useState<Date>(new Date())
    const { mutate: setFeaturedMutation } = api.event.setFeatured.useMutation()
    const { mutate: deleteMutation } = api.event.delete.useMutation()
    const { mutate: approveMutation } = api.event.approve.useMutation()
    const { data, isLoading, isFetched, refetch } =
        api.event.getAllByDay.useQuery({
            date: filteredDate
        })

    const handleEditClick = useCallback(
        async (event: EventWithArtistVenue) => {
            const params = new URLSearchParams()
            params.set('id', event.id)
            await router.push(
                {
                    pathname: '/admin/edit-event',
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
            approveMutation(
                { id: event.id, approved: !event.approved },
                {
                    onSuccess: () => {
                        toast({
                            title: 'Success',
                            message: 'Event approved'
                        })
                        void refetch()
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
        [approveMutation, refetch, toast]
    )

    const handleToggleFeatured = useCallback(
        (event: EventWithArtistVenue) => {
            setFeaturedMutation(
                { id: event.id, featured: !event.featured },
                {
                    onSuccess: () => {
                        toast({
                            title: 'Success',
                            message: 'Featured event updated'
                        })
                        void refetch()
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
        [setFeaturedMutation, refetch, toast]
    )

    const handleDelete = useCallback(
        (event: EventWithArtistVenue) => {
            deleteMutation(
                { id: event.id },
                {
                    onSuccess: () => {
                        void refetch()
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
        [deleteMutation, refetch, toast]
    )

    const columns = useMemo(
        () => [
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
                enableColumnFilter: false
            }),
            columnHelper.accessor((row) => row.endDate, {
                cell: (info) => format(new Date(info.getValue()), 'h:mm a'),
                header: 'End',
                enableColumnFilter: false
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
                    />
                ),
                header: 'Edit'
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
        <Flex direction="column">
            <Flex mb="4" direction="column" className="max-w-xs" gap="3">
                <Heading>Filter by date:</Heading>
                <TextField.Root className="px-2 pt-1">
                    <TextField.Input
                        type="date"
                        value={format(filteredDate, 'yyyy-MM-dd')}
                        onChange={(e) =>
                            setFilteredDate(new Date(e.target.value))
                        }
                        placeholder="Filter by date"
                    />
                </TextField.Root>
            </Flex>
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
        </Flex>
    )
}
