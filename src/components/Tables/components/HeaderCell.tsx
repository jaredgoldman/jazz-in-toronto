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

// TODO: If the conditional logic in this component gets too complex, consider
// creating seperate components for each filter type
export function HeaderCell<TData>({ header }: Props<TData>) {
    const sortingIcons = {
        asc: <CaretUpIcon />,
        desc: <CaretDownIcon />
    }

    const getFilterInputType = (filterFn?: string) => {
        switch (filterFn) {
            case 'date':
                return 'date'
            case 'fuzzy':
                return 'text'
            case 'time':
                return 'time'
            default:
                return 'text'
        }
    }

    return (
        <Table.ColumnHeaderCell
            onClick={() => header.column.toggleSorting()}
            className={`${
                header.column.getCanSort() ? 'cursor-pointer select-none' : ''
            } min-w-[100px]`}
        >
            <Flex direction="column" gap="2">
                <Flex align="center" gap="2" ml="2">
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
                            type={getFilterInputType(
                                header.column.columnDef.filterFn as string
                            )}
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
