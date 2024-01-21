import { useState, ReactNode, useCallback, useEffect } from 'react'
import { Flex, Button } from '@radix-ui/themes'
import {
    ArrowRightIcon,
    ArrowLeftIcon,
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon
} from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'

type Props<T> = {
    table: Table<T>
    visiblePageButtons?: number
}

export function PaginationButtonGroup<T>({
    table,
    visiblePageButtons = 6
}: Props<T>) {
    // Calculate total pages
    const isOverflow = table.getPageCount() > visiblePageButtons
    // Account for elipsis, final page number and zero index
    const visible =
        (isOverflow ? visiblePageButtons - 2 : visiblePageButtons) - 1
    const [buttons, setButtons] = useState<ReactNode[]>([])

    const pageIndex = table.getState().pagination.pageIndex
    const totalPages = table.getPageCount()
    /*
     * Do some calculations to see if we should iterate our offsets which represent the
     * range of numbers we want to see in the component at any given time
     */
    const getOffsets = useCallback(() => {
        let start = 0
        let end = visible
        if (pageIndex < start) {
            // pageIndexis before the current visible range
            start = pageIndex
            end = pageIndex + visible
        } else if (pageIndex > end) {
            // pageIndexis after the current visible range
            start = pageIndex - visible
            end = pageIndex
        } else {
            // pageIndex is within the visible range, no need to update offsets
            return { start, end }
        }

        // Check gap to the end and reduce start section to keep same number of buttons rendered
        const gapToEnd = totalPages - end
        if (gapToEnd <= 3) {
            start -= 3 - gapToEnd
        }

        // Make sure start and end are within valid boundaries (e.g., not going negative or exceeding max pages)
        start = Math.max(0, start)
        end = Math.min(totalPages - 1, end)

        return { start, end }
    }, [totalPages, visible, pageIndex])

    /*
     * Function responsible for producing correct PaginationButton component
     * Ensures proper numbers and elipsis are visible depending on
     * the current number we've looped through and the current page that's selelcted
     */
    const renderButton = useCallback(
        (indexNum: number, startIndex: number, endIndex: number) => {
            const num = indexNum + 1
            // Button-rendering conditions
            const renderRangePageNumber =
                indexNum >= startIndex && indexNum <= endIndex
            const isLastPage = num === totalPages
            const isSecondLastButton = num === totalPages - 1

            // Ellipsis-rendering conditions
            const shouldShowLastPage = isOverflow && isLastPage
            const renderElipsis =
                isOverflow && !renderRangePageNumber && isSecondLastButton

            if (renderElipsis) {
                return <Button key={num}>...</Button>
            }
            const isSelected = pageIndex === indexNum

            // Number is in visible range
            if (renderRangePageNumber || shouldShowLastPage) {
                return (
                    <Button
                        key={num}
                        onClick={() => {
                            table.setPageIndex(indexNum)
                        }}
                        disabled={isSelected}
                    >
                        {num}
                    </Button>
                )
            }
        },
        [totalPages, pageIndex, isOverflow, table]
    )

    // Finally re-render buttons when state changes
    useEffect(() => {
        const { start, end } = getOffsets()
        const pageButtons = Array.from({ length: totalPages }, (_, i) => i)
            .map((num) => renderButton(num, start, end))
            .filter(Boolean)
        setButtons(pageButtons)
    }, [renderButton, totalPages, pageIndex, getOffsets])

    return (
        <Flex gap="2">
            <Button
                onClick={() => {
                    table.setPageIndex(0)
                }}
                disabled={!table.getCanPreviousPage()}
            >
                <DoubleArrowLeftIcon />
            </Button>
            <Button
                onClick={() => {
                    table.previousPage()
                }}
                disabled={!table.getCanPreviousPage()}
            >
                <ArrowLeftIcon />
            </Button>
            {buttons}
            <Button
                onClick={() => {
                    table.nextPage()
                }}
                disabled={!table.getCanNextPage()}
            >
                <ArrowRightIcon />
            </Button>
            <Button
                onClick={() => {
                    table.setPageIndex(table.getPageCount() - 1)
                }}
                disabled={!table.getCanNextPage()}
            >
                <DoubleArrowRightIcon />
            </Button>
        </Flex>
    )
}
