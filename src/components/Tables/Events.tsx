import { useState } from 'react'
import { api } from '~/utils/api'
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    SortingState,
    getSortedRowModel,
    getFilteredRowModel,
    ColumnFiltersState
} from '@tanstack/react-table'
import { EventWithArtistVenue } from '~/types/data'
import { Table, Flex, TextField, Heading } from '@radix-ui/themes'
import { format } from 'date-fns'
import { useMemo } from 'react'
import Loading from '../Loading'
import { HeaderCell } from './components'
import { fuzzyFilter } from './utils/filters'

export function EventsTable() {
    const [filteredDate, setFilteredDate] = useState<Date>(new Date())
    const { data, isLoading, isFetched } = api.event.getAllByDay.useQuery({
        date: filteredDate
    })

    const columns = useMemo<ColumnDef<EventWithArtistVenue>[]>(
        () => [
            {
                accessorKey: 'name',
                cell: (info) => info.getValue(),
                header: () => <span>Event</span>
            },
            {
                accessorKey: 'venue.name',
                cell: (info) => info.getValue(),
                header: () => <span>Venue</span>
            },
            {
                accessorKey: 'startDate',
                cell: (info) =>
                    format(new Date(info.getValue() as string), 'h:mm a'),
                header: () => <span>Start</span>,
                enableColumnFilter: false
            },
            {
                accessorKey: 'endDate',
                cell: (info) =>
                    format(new Date(info.getValue() as string), 'h:mm a'),
                header: () => <span>End</span>,
                enableColumnFilter: false
            },
            {
                accessorKey: 'artist.name',
                cell: (info) => info.getValue(),
                header: () => <span>Artist</span>
            },
            {
                accessorKey: 'venue.website',
                cell: (info) => info.getValue(),
                header: () => <span>Website</span>
            },
            {
                accessorKey: 'venue.instagramHandle',
                cell: (info) => info.getValue(),
                header: () => <span>Instagram</span>
            },
            {
                accessorKey: 'cancelled',
                cell: (info) => info.getValue()?.toString(),
                header: () => <span>Cancelled</span>,
                enableColumnFilter: false
            },
            {
                accessorKey: 'featured',
                cell: (info) => info.getValue()?.toString(),
                header: () => <span>Featured</span>,
                enableColumnFilter: false
            }
        ],
        []
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
