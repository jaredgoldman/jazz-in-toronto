import { useState } from 'react'
import { api } from '~/utils/api'
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    SortingState,
    getSortedRowModel
} from '@tanstack/react-table'
import { EventWithArtistVenue } from '~/types/data'
import { Table, Box } from '@radix-ui/themes'
import { format } from 'date-fns'
import { useMemo } from 'react'
import Loading from '../Loading'
import { HeaderCell } from './components'

export function EventsTable() {
    const { data, isLoading, isFetched } = api.event.getAll.useQuery()

    const columns = useMemo<ColumnDef<EventWithArtistVenue>[]>(
        () => [
            {
                accessorKey: 'name',
                cell: (info) => info.getValue(),
                header: () => <span>Event Name</span>
            },
            {
                accessorKey: 'venue.name',
                cell: (info) => info.getValue(),
                header: () => <span>Venue</span>
            },
            {
                accessorKey: 'startDate',
                cell: (info) =>
                    format(new Date(info.getValue() as string), 'MM-dd-yyyy'),
                header: () => <span>Start Date</span>
            },
            {
                accessorKey: 'endDate',
                cell: (info) =>
                    format(new Date(info.getValue() as string), 'MM-dd-yyyy'),
                header: () => <span>End Date</span>
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
                header: () => <span>Instagram Handle</span>
            },
            {
                accessorKey: 'cancelled',
                cell: (info) => info.getValue()?.toString(),
                header: () => <span>Cancelled</span>
            },
            {
                accessorKey: 'featured',
                cell: (info) => info.getValue()?.toString(),
                header: () => <span>Featured</span>
            }
        ],
        []
    )

    const [sorting, setSorting] = useState<SortingState>([])

    const table = useReactTable<EventWithArtistVenue>({
        data: data ?? [],
        columns,
        state: {
            sorting
        },
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting
    })

    return (
        <Box>
            {data?.length && (
                <Table.Root variant="surface">
                    <Table.Header>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <Table.Row key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <HeaderCell header={header} />
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
            )}
            {isFetched && !data?.length && <div>Empty state placeholder</div> }
            {isLoading && <Loading/>}
        </Box>
    )
}
