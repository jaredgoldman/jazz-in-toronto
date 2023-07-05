import { useEffect, useState } from "react"
import ReactDatePicker from "react-datepicker"
import { FieldProps } from "formik"
import "react-datepicker/dist/react-datepicker.css"

export default function DatePicker<T>({
    form,
    field,
}: FieldProps<Date, T>): JSX.Element {
    const [startDate, setStartDate] = useState<Date | null>(field.value)

    useEffect(() => {
        form.setFieldValue(field.name, startDate)
    }, [startDate])

    return (
        <ReactDatePicker
            selected={startDate}
            onChange={(date: Date) => setStartDate(new Date(date))}
            showTimeSelect
        />
    )
}
