import { Table, Flex, Box } from '@radix-ui/themes'
import { Header } from '@tanstack/react-table'
import {
    ChevronDownIcon,
    ChevronUpIcon,
    ChevronRightIcon
} from '@radix-ui/react-icons'
import { flexRender } from '@tanstack/react-table'

export type Props<TData> = {
    header: Header<TData, unknown>
}

export function HeaderCell<TData>({ header }: Props<TData>) {
    const sortingIcons = {
        asc: <ChevronUpIcon />,
        desc: <ChevronDownIcon />
    }

    return (
        <Table.ColumnHeaderCell
            onClick={() => header.column.toggleSorting()}
            className={
                header.column.getCanSort() ? 'cursor-pointer select-none' : ''
            }
        >
            <Flex align="center" gap="2">
                {header.isPlaceholder
                    ? null
                    : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                      )}
                <Box>
                    {sortingIcons[
                        header.column.getIsSorted() as 'desc' | 'asc'
                    ] ?? <ChevronRightIcon />}
                </Box>
            </Flex>
        </Table.ColumnHeaderCell>
    )
}
