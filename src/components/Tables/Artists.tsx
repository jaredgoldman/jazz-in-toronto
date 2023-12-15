//local components
import { api } from '~/utils/api'
import { Artist } from '~/types/data'
//modules
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Table, flexPropDefs } from '@radix-ui/themes';
import { format } from 'date-fns'

export function ArtistsTable() {
  //fetch data and set loading state
  const { data, isLoading } = api.artist.getAll.useQuery();

  //columndef setup using columnHelper. May need to change to other method using/
  //useMemo in order to add extended functionality 
  //as in: https://codesandbox.io/p/devbox/tanstack-table-example-row-selection-2llvty?file=%2Fsrc%2Fmain.tsx%3A38%2C29
  //
  const columnHelper = createColumnHelper<Artist>();

  const columns = [
    columnHelper.accessor('name', {
      cell: info => info.getValue(),
      header: () => <span>Name</span>,
    }),
    columnHelper.accessor('genre', {
      cell: info => info.getValue(),
      header: () => <span>Genre</span>,
    }),
    columnHelper.accessor('website', {
      cell: info => info.getValue(),
      header: () => <span>Website</span>,
    }),
    columnHelper.accessor('instagramHandle', {
      cell: info => info.getValue(),
      header: () => <span>Instagram Handle</span>,
    }),
    columnHelper.accessor('active', {
      cell: info => info.renderValue()?.toString(),
      header: () => <span>Active</span>,
    }),
    columnHelper.accessor('featured', {
      cell: info => info.renderValue()?.toString(),
      header: () => <span>Featured</span>,
    }),
  ]

  const table = useReactTable<Artist>({
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
