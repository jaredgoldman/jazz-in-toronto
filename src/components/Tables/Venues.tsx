import { api } from '~/utils/api'
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
  //fetch data and set loading state
  const { data, isLoading } = api.event.getAll.useQuery();

  //columndef setup using columnHelper. May need to change to other method using/
  //useMemo in order to add extended functionality 
  //as in: https://codesandbox.io/p/devbox/tanstack-table-example-row-selection-2llvty?file=%2Fsrc%2Fmain.tsx%3A38%2C29
  //
  //using EventWithArtistVenue for all tables because TS yells at me otherwise  
  const columnHelper = createColumnHelper<EventWithArtistVenue>();

  const columns = [
    columnHelper.accessor('venue.name', {
      cell: info => info.getValue(),
      header: () => <span>Venue Name</span>,
    }),
    columnHelper.accessor('venue.address', {
      cell: info => info.getValue(),
      header: () => <span>Address</span>,
    }),
    columnHelper.accessor('venue.city', {
      cell: info => info.getValue(),
      header: () => <span>City</span>,
    }),
    columnHelper.accessor('venue.website', {
      cell: info => info.getValue(),
      header: () => <span>Website</span>,
    }),
    columnHelper.accessor('venue.active', {
      cell: info => info.getValue()?.toString(),
      header: () => <span>Active</span>,
    }),
    columnHelper.accessor('venue.instagramHandle', {
      cell: info => info.getValue(),
      header: () => <span>Instagram</span>,
    }),
    columnHelper.accessor('venue.featured', {
      cell: info => info.getValue()?.toString(),
      header: () => <span>Featured</span>,
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
