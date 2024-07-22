import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { Table, Flex, Box, TextField } from '@radix-ui/themes'
import { Header } from '@tanstack/react-table'
import {
    CaretSortIcon,
    CaretDownIcon,
    CaretUpIcon
} from '@radix-ui/react-icons'
import { flexRender } from '@tanstack/react-table'
import { useDebounce } from '~/hooks'

export type Props<TData> = {
    header: Header<TData, unknown>
}

// TODO: If the conditional logic in this component gets too complex, consider
// creating separate components for each filter type
export function HeaderCell<TData>({ header }: Props<TData>) {
    const [filterValue, setFilterValue] = useState<string>(
        (header.column.getFilterValue() as string) ?? ''
    )

    const debouncedFilterValue = useDebounce(filterValue, 300)

    const sortingIcons = useMemo(
        () => ({
            asc: <CaretUpIcon />,
            desc: <CaretDownIcon />
        }),
        []
    )

    const getFilterInputType = useCallback((filterFn?: string) => {
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
    }, [])

    const handleOnChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => setFilterValue(e.target.value),
        [setFilterValue]
    )

    useEffect(() => {
        if (header.column.getCanFilter()) {
            setFilterValue(String(header.column.getFilterValue() ?? ''))
        }
    }, [header.column.getCanFilter(), header.column.getFilterValue()])

    useEffect(() => {
        if (!header.column.getCanFilter()) return
        header.column.setFilterValue(debouncedFilterValue)
    }, [debouncedFilterValue, header.column.getCanFilter()])

    return (
        <Table.ColumnHeaderCell
            className={
                header.column.getCanSort() ? 'cursor-pointer select-none' : ''
            }
            justify="center"
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
                        <Box onClick={() => header.column.toggleSorting()}>
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
                                String(header.column.columnDef.filterFn)
                            )}
                            value={filterValue}
                            onChange={handleOnChange}
                            placeholder="Filter"
                        />
                    </TextField.Root>
                )}
            </Flex>
        </Table.ColumnHeaderCell>
    )
}
