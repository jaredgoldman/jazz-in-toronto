import { api } from '~/utils/api'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { EventWithArtistVenue } from '~/types/data'
import { Table } from '@radix-ui/themes';
import { format } from 'date-fns'

export function EventsTable() {
  //fetch data and set loading state
  const { data } = api.event.getAll.useQuery();

  const columns = React.useMemo<ColumnDef<EventWithArtistVenue>[]>(() => [
    {
      accessorKey: 'name',
      cell: info => info.getValue(),
      header: () => <span>Event Name</span>,
    },
    {
      accessorKey: 'venue.name',
      cell: info => info.getValue(),
      header: () => <span>Venue</span>,
    },
    {
      accessorKey: 'startDate',
      cell: info => format(info.getValue(), "mm-dd-yyyy"),
      header: () => <span>Start Date</span>,
    },
    {
      accessorKey: 'endDate',
      cell: info => format(info.getValue(), "mm-dd-yyyy"),
      header: () => <span>End Date</span>,
    },
    {
      accessorKey: 'artist.name',
      cell: info => info.getValue(),
      header: () => <span>Artist</span>,
    },
    {
      accessorKey: 'venue.website',
      cell: info => info.getValue(),
      header: () => <span>Website</span>,
    },
    {
      accessorKey: 'venue.instagramHandle',
      cell: info => info.getValue(),
      header: () => <span>Instagram Handle</span>,
    },
    {
      accessorKey: 'cancelled',
      cell: info => info.getValue()?.toString(),
      header: () => <span>Cancelled</span>,
    },
    {
      accessorKey: 'featured',
      cell: info => info.getValue()?.toString(),
      header: () => <span>Featured</span>,
    },
  ], [])

  const table = useReactTable<EventWithArtistVenue>({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div>
      <Table.Root>
        <Table.Header>
          {table.getHeaderGroups().map(headerGroup => (
            <Table.Row key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <Table.RowHeaderCell key={header.id}>
                  {header.isPlaceholder ? null : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </Table.RowHeaderCell>
              ))}
            </Table.Row>
          ))}
        </Table.Header>
        <Table.Body>
          {table.getRowModel().rows.map(row => (
            <Table.Row key={row.id}>
              {row.getVisibleCells().map(cell => (
                <Table.Cell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}
