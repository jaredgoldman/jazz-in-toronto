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

export function VenuesTable() {
  const { data, isLoading } = api.event.getAll.useQuery();

  const columnHelper = createColumnHelper<EventWithArtistVenue>();

  const columns = [
    columnHelper.accessor('venue.name', {
      cell: info => info.getValue(),
      header: () => <span>Venue Name</span>,
    }), 
  ]

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
