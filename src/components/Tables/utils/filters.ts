import { FilterFn } from '@tanstack/react-table'
import { rankItem } from '@tanstack/match-sorter-utils'
import isSameDay from 'date-fns/isSameDay'
import parseISO from 'date-fns/parseISO'

export const fuzzyFilter: FilterFn<unknown> = (
    row,
    columnId,
    value,
    addMeta
) => {
    console.log({
        value
    })
    if (!value) return true
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value as string)

    // Store the itemRank info
    addMeta({
        itemRank
    })

    // Return if the item should be filtered in/out
    return itemRank.passed
}

export const dateFilter: FilterFn<unknown> = (row, columnId, value: string) => {
    if (!value) return true
    const rowValue = new Date(row.getValue<string>(columnId))
    const filterValue = parseISO(value)
    return isSameDay(rowValue, filterValue)
}

export const timeFilter: FilterFn<unknown> = (
    row,
    columnId: string,
    filterValue: string
) => {
    if (!filterValue) return true
    const rowValue = new Date(row.getValue<string>(columnId))
    const filterValueDate = new Date(filterValue)
    return (
        rowValue.getHours() === filterValueDate.getHours() &&
        rowValue.getMinutes() === filterValueDate.getMinutes()
    )
}
