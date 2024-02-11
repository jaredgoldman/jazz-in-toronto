import { FilterFn } from '@tanstack/react-table'

declare module '@tanstack/react-table' {
    interface FilterFns {
        fuzzy: FilterFn<unknown>
        date: FilterFn<unknown>
    }
}
