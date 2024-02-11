import { Table, Flex, Box, TextField } from '@radix-ui/themes'
import { Header } from '@tanstack/react-table'
import {
    CaretSortIcon,
    CaretDownIcon,
    CaretUpIcon
} from '@radix-ui/react-icons'
import { flexRender } from '@tanstack/react-table'

export type Props<TData> = {
    header: Header<TData, unknown>
}

export function HeaderCell<TData>({ header }: Props<TData>) {
    const sortingIcons = {
        asc: <CaretUpIcon />,
        desc: <CaretDownIcon />
    }

    return (
        <Table.ColumnHeaderCell
            onClick={() => header.column.toggleSorting()}
            className={`${
                header.column.getCanSort() ? 'cursor-pointer select-none' : ''
            } min-w-[100px]`}
        >
            <Flex direction="column" gap="2">
                <Flex align="center" gap="2" ml="1">
                    {header.isPlaceholder
                        ? null
                        : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                          )}
                    {header.column.getCanSort() && (
                        <Box>
                            {sortingIcons[
                                header.column.getIsSorted() as 'desc' | 'asc'
                            ] ?? <CaretSortIcon />}
                        </Box>
                    )}
                </Flex>
                {header.column.getCanFilter() && (
                    <TextField.Root>
                        <TextField.Input
                            type={
                                header.column.columnDef.filterFn === 'date'
                                    ? 'date'
                                    : 'text'
                            }
                            value={
                                (header.column.getFilterValue() as string) ?? ''
                            }
                            onChange={(e) =>
                                header.column.setFilterValue(e.target.value)
                            }
                            placeholder="Filter"
                        />
                    </TextField.Root>
                )}
            </Flex>
        </Table.ColumnHeaderCell>
    )
}
