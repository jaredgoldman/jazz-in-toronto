import { useEffect, useState } from "react"
import ReactDatePicker from "react-datepicker"
import { FieldProps, Field, ErrorMessage } from "formik"
import "react-datepicker/dist/react-datepicker.css"

interface DatePickerProps {
    label: string
    name: string
    className?: string
    fieldClassName?: string
}

export default function DatePickerField({
    label,
    name,
    className = "flex flex-col m-2",
    fieldClassName = "mb-5 border-2 border-black"
}: DatePickerProps): JSX.Element {
    return (
        <div className={className}>
            <label>{label}</label>
            <Field
                name={name}
                className={fieldClassName}
                component={DatePicker}
            />
            <ErrorMessage name={name} component="div" />
        </div>
    )
}

const DatePicker = ({ form, field }: FieldProps<Date, any>): JSX.Element => {
    const [startDate, setStartDate] = useState<Date | null>(new Date())

    useEffect(() => {
        if (startDate !== field.value) form.setFieldValue(field.name, startDate)
    }, [startDate, form, field.name])

    return (
        <ReactDatePicker
            selected={startDate}
            onChange={(date: Date) => setStartDate(new Date(date))}
            showTimeSelect
        />
    )
}
