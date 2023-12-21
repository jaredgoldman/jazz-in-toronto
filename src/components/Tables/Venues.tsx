import { api } from '~/utils/api'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Venue } from '~/types/data'
import { Table } from '@radix-ui/themes';
import { useMemo } from 'react';

export function VenuesTable() {
  //fetch data and set loading state
  const { data } = api.venue.getAll.useQuery();

  const columns = useMemo<ColumnDef<Venue>[]>(() => [
    {
      accessorKey: 'name',
      cell: info => info.getValue(),
      header: () => <span>Name</span>,
    },
    {
      accessorKey: 'address',
      cell: info => info.getValue(),
      header: () => <span>Address</span>,
    },
    {
      accessorKey: 'city',
      cell: info => info.getValue(),
      header: () => <span>City</span>,
    },
    {
      accessorKey: 'website',
      cell: info => info.getValue(),
      header: () => <span>Website</span>,
    },
    {
      accessorKey: 'active',
      cell: info => info.getValue()?.toString(),
      header: () => <span>Active</span>,
    },
    {
      accessorKey: 'instagramHandle',
      cell: info => info.getValue(),
      header: () => <span>Instagram</span>,
    },
    {
      accessorKey: 'featured',
      cell: info => info.getValue()?.toString(),
      header: () => <span>Featured</span>,
    },
  ], [])

  const table = useReactTable<Venue>({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div>
      <Table.Root variant="surface">
        <Table.Header>
          {table.getHeaderGroups().map(headerGroup => (
            /*iterate through headers*/
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
            /*iterate through cells*/
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
