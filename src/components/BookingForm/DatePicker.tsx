import { useEffect, useState } from "react"
import ReactDatePicker from "react-datepicker"
import { FieldProps } from "formik"
import "react-datepicker/dist/react-datepicker.css"
import { Values } from "."

export default function DatePickerField({
    form,
    field,
}: FieldProps<string, Values>): JSX.Element {
    const [startDate, setStartDate] = useState<Date | null>(new Date())

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
