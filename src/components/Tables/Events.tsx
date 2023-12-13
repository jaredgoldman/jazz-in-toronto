import { api } from '~/utils/api'
import { useEffect } from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { EventWithArtistVenue } from '~/types/data'
import { Table, flexPropDefs } from '@radix-ui/themes';
import { format } from 'date-fns'

export function EventsTable() {
  const { data, isLoading } = api.event.getAll.useQuery();

  const columnHelper = createColumnHelper<EventWithArtistVenue>()

  const columns = [
    columnHelper.accessor('name', {
      cell: info => info.getValue(),
      header: () => <span>Event Name</span>,
    }),
    columnHelper.accessor('venue.name', {
      cell: info => info.getValue(),
      header: () => <span>Venue</span>,
    }),
    columnHelper.accessor('startDate', {
      cell: info => format(info.getValue(), "mm-dd-yyyy"),
      header: () => <span>Start Date</span>,
    }),
    columnHelper.accessor('endDate', {
      cell: info => format(info.getValue(), "mm-dd-yyyy"),
      header: () => <span>End Date</span>, 
    }),
    columnHelper.accessor('artist.name', {
      cell: info => info.getValue(),
      header: () => <span>Artist</span>,
    }),
    columnHelper.accessor('venue.website', {
      cell: info => info.getValue(),
      header: () => <span>Website</span>,
    }),
    columnHelper.accessor('venue.instagramHandle', {
      cell: info => info.getValue(),
      header: () => <span>Instagram Handle</span>,
    }),
    columnHelper.accessor('cancelled', {
      cell: info => info.getValue()?.toString(),
      header: () => <span>Cancelled</span>,
    }),
    columnHelper.accessor('featured', {
      cell: info => info.getValue()?.toString(),
      header: () => <span>Featured</span>,
    }),
  ]

  useEffect(() => {
    console.log("", data);
  }, [data])

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
