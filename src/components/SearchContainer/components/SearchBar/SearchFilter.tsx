import { type ChangeEvent } from 'react'
import { SearchOption } from '../../types'
import ReactDatePicker from 'react-datepicker'
import Container from '~/components/Container'

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
    let Component: React.ElementType = 'input'
    let componentProps = {}
    const className = 'w-28 text-black'

    switch (type) {
        case SearchOption.Date:
            Component = ReactDatePicker
            componentProps = {
                onChange: (data: Date) => {
                    onSearch(data, type)
                    setStartDate && setStartDate(data)
                },
                startDate,
                className
            }
            break
        case SearchOption.Venue:
        case SearchOption.Website:
        case SearchOption.Name:
        case SearchOption.InstagramHandle:
            Component = 'input'
            componentProps = {
                onChange: (event: ChangeEvent<HTMLInputElement>) =>
                    onSearch(event.target.value, type),
                className
            }
            break
    }

    return (
        <Container width="xs">
            <div className="flex flex-col">
                <label>{label}</label>
                <Component {...componentProps} />
            </div>
        </Container>
    )
}
