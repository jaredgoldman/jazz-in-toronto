// Componenets
import ReactDatePicker from 'react-datepicker'
import { Flex, TextField } from '@radix-ui/themes'
// Types
import { type ChangeEvent } from 'react'
import { SearchOption } from '../../types'
// Utils
import { useTheme } from 'next-themes'

interface Props {
    onSearch: (searchData: string | Date, searchOption: SearchOption) => void
    type: SearchOption
    label: string
    startDate?: Date | null
    setStartDate?: (date: Date) => void
}

export default function SearchFilter({
    onSearch,
    type,
    label,
    startDate,
    setStartDate
}: Props): JSX.Element {
    const { theme } = useTheme()
    let Component: React.ElementType = 'input'
    let componentProps = {}
    const className = 'w-28 text-black'
    const datePickerTextColor = theme === 'dark' ? 'white-300' : 'gray-700'

    switch (type) {
        case SearchOption.Date:
            Component = ReactDatePicker
            componentProps = {
                onChange: (data: Date) => {
                    onSearch(data, type)
                    setStartDate && setStartDate(data)
                },
                selected: startDate,
                startDate,
                className: `lg:min-w-full min-w-0 rounded-[4px] border-[1px] p-[0.325rem] text-sm text-${datePickerTextColor}`
            }
            break
        case SearchOption.Venue:
        case SearchOption.Website:
        case SearchOption.Name:
        case SearchOption.InstagramHandle:
            Component = TextField.Input
            componentProps = {
                onChange: (event: ChangeEvent<HTMLInputElement>) =>
                    onSearch(event.target.value, type),
                className
            }
            break
    }

    return (
        <Flex direction="column" mr="3">
            <label>{label}</label>
            <Component {...componentProps} />
        </Flex>
    )
}
