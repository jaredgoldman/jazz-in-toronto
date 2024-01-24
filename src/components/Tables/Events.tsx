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
import { Table, Flex, TextField, Heading, Text } from '@radix-ui/themes'
import { format } from 'date-fns'
import { useMemo } from 'react'
import Loading from '../Loading'
import { HeaderCell, TableActionMenu } from './components'
import { fuzzyFilter } from './utils/filters'
import { useRouter } from 'next/router'
import FadeOutText from '../FadeOutText'

const columnHelper = createColumnHelper<EventWithArtistVenue>()

export function EventsTable() {
    const [filteredDate, setFilteredDate] = useState<Date>(new Date())
    const [error, setError] = useState<string | null>(null)
    const { data, isLoading, isFetched, refetch } =
        api.event.getAllByDay.useQuery({
            date: filteredDate
        })
    const router = useRouter()
    const { mutate: setFeaturedMutation, isSuccess: setFeaturedIsSuccess } =
        api.event.setFeatured.useMutation()
    const { mutate: deleteMutation, isSuccess: deleteMutationIsSuccess } =
        api.event.delete.useMutation()

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

    const handleToggleFeatured = useCallback(
        (event: EventWithArtistVenue) => {
            setFeaturedMutation(
                { id: event.id },
                {
                    onSuccess: () => {
                        void refetch()
                    },
                    onError: (e) => {
                        setError(
                            'Setting featured event failed. Please try again later.'
                        )
                        console.error(e)
                    }
                }
            )
        },
        [setFeaturedMutation, refetch]
    )

    const handleDelete = useCallback(
        (event: EventWithArtistVenue) => {
            deleteMutation(
                { id: event.id },
                {
                    onSuccess: () => {
                        void refetch()
                    },
                    onError: (e) => {
                        setError('Delete event failed. Please try again later.')
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
                cell: (info) => info.getValue()?.toString(),
                header: 'Cancelled',
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
            {setFeaturedIsSuccess && (
                <FadeOutText>
                    <Text color="green" size="2" align="center">
                        Event successfully set as featured
                    </Text>
                </FadeOutText>
            )}
            {deleteMutationIsSuccess && (
                <FadeOutText>
                    <Text color="red" size="2" align="center">
                        Event has been deleted
                    </Text>
                </FadeOutText>
            )}
            {error ? (
                <FadeOutText>
                    <Text color="yellow" size="2" align="center">
                        {error}
                    </Text>
                </FadeOutText>
            ) : null}
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
