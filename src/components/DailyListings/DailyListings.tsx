import { useMemo, useState } from 'react'
import { Button, Heading, Flex, Table } from '@radix-ui/themes'
import { api } from '~/utils/api'
import { addDays, format } from 'date-fns'
import {
    useReactTable,
    createColumnHelper,
    getCoreRowModel,
    flexRender,
    SortingState,
    getSortedRowModel
} from '@tanstack/react-table'
import { EventWithArtistVenue } from '~/types/data'
import Loading from '../Loading'
import { HeaderCell } from '../Tables/components'
import { fuzzyFilter } from '../Tables/utils/filters'

interface Props {
    selectedDate: Date
}

const columnHelper = createColumnHelper<EventWithArtistVenue>()

/**
 * Component to show daily listings in chronologcal order per day
 */
export default function DailyListings({ selectedDate }: Props) {
    const { data, isLoading, isFetched } = api.event.getAllByDay.useQuery({
        date: selectedDate
    })

    const columns = useMemo(
        () => [
            columnHelper.accessor((row) => row.venue.name, {
                header: 'Venue Name',
                cell: (info) => info.getValue(),
                enableColumnFilter: false
            }),
            columnHelper.accessor((row) => row.artist.name, {
                header: 'Artist',
                cell: (info) => info.getValue(),
                enableColumnFilter: false
            }),
            columnHelper.accessor(
                (row) => ({ startDate: row.startDate, endDate: row.endDate }),
                {
                    id: 'startDate',
                    header: 'Time',
                    cell: (info) =>
                        `${format(
                            info.getValue().startDate,
                            'h:mm a'
                        )} - ${format(info.getValue().endDate, `h:mm a`)}`,
                    enableColumnFilter: false
                }
            )
        ],
        []
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
        state: {
            sorting
        },
        filterFns: {
            fuzzy: fuzzyFilter
        },
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting
    })

    return (
        <Flex direction="column" grow="1">
            {data?.length && (
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
            )}
            {isFetched && !data?.length && <div>Empty state placeholder</div>}
            {isLoading && <Loading />}
        </Flex>
    )
}
