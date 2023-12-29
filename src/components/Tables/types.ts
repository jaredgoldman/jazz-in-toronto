import { FilterFn } from '@tanstack/react-table'

declare module '@tanstack/table-core' {
    interface FilterFns {
        fuzzy: FilterFn<unknown>
    }
}
