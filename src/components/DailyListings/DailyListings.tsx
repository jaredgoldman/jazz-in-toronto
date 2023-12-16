import { useMemo, useState } from 'react'
import { Button, Heading, Flex, Box, Table } from '@radix-ui/themes'
import { api } from '~/utils/api'
import { addDays, format } from 'date-fns'
import {
    useReactTable,
    createColumnHelper,
    getCoreRowModel,
    flexRender,
    SortingState
} from '@tanstack/react-table'
import { EventWithArtistVenue } from '~/types/data'

interface Props {
    onChangeListingType: () => void
}
/**
 * Component to show daily listings in chronologcal order per day
 */
export default function DailyListings({ onChangeListingType }: Props) {
    const [selectedDate, setSelectedDate] = useState(new Date())

    const { data } = api.event.getAllByDay.useQuery({
        date: selectedDate
    })

    const columnHelper = createColumnHelper<EventWithArtistVenue>()

    const columns = useMemo(
        () => [
            columnHelper.accessor((row) => row.venue.name, {
                id: 'venueName',
                header: 'Venue Name',
                cell: (info) => info.getValue()
            }),
            columnHelper.accessor((row) => row.artist.name, {
                id: 'artist',
                header: 'Artist',
                cell: (info) => info.getValue()
            }),
            columnHelper.accessor(
                (row) => ({ startDate: row.startDate, endDate: row.endDate }),
                {
                    id: 'time',
                    header: 'Time',
                    cell: (info) =>
                        `${format(
                            info.getValue().startDate,
                            'h:mm a'
                        )} - ${format(info.getValue().endDate, `h:mm a`)}`
                }
            )
        ],
        [columnHelper]
    )

    const [sorting, setSorting] = useState<SortingState>([
        { id: 'time', desc: true }
    ])

    const table = useReactTable<EventWithArtistVenue>({
        data: data ? data : [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        initialState: {
            sorting
        },
        onSortingChange: setSorting
    })

    return (
        <Box>
            <Heading
                size={{ initial: '8', xs: '9' }}
                align={{ initial: 'center', xs: 'left' }}
                mb="6"
            >
                Daily Listings
            </Heading>
            <Flex mb="5" gap="3">
                <Button
                    onClick={() => {
                        setSelectedDate(addDays(selectedDate, -1))
                    }}
                >
                    Previous Day
                </Button>
                <Button
                    onClick={() => setSelectedDate(addDays(selectedDate, 1))}
                >
                    Next Day
                </Button>
                <Button variant="soft" onClick={onChangeListingType}>
                    View in Calendar
                </Button>
            </Flex>
            <Heading
                size={{ initial: '3', xs: '5' }}
                align={{ initial: 'center', xs: 'left' }}
                mb="5"
            >{`Events on ${format(
                selectedDate,
                'EEEE, MMMM do, yyyy'
            )} in Toronto, Ontario`}</Heading>
            <Table.Root variant="surface">
                <Table.Header>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Table.Row key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <Table.ColumnHeaderCell key={header.id}>
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                </Table.ColumnHeaderCell>
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
        </Box>
    )
}
