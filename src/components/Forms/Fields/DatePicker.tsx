// Libraries
import { useEffect, useState } from 'react'
import ReactDatePicker, { type ReactDatePickerProps } from 'react-datepicker'
import {
    type FieldInputProps,
    type FormikProps,
    Field,
    ErrorMessage
} from 'formik'
import 'react-datepicker/dist/react-datepicker.css'

interface Props {
    label: string
    name: string
    className?: string
    fieldClassName?: string
    datePickerProps?: Omit<ReactDatePickerProps, 'onChange'>
}

export default function DatePickerField({
    label,
    name,
    className = 'flex flex-col mb-5',
    fieldClassName = 'mb-5 border-2 border-black text-black',
    datePickerProps
}: Props): JSX.Element {
    return (
        <div className={className}>
            <label>{label}</label>
            <Field
                name={name}
                className={fieldClassName}
                component={DatePicker}
                props={datePickerProps}
            />
            <ErrorMessage name={name} component="div" />
        </div>
    )
}

interface DatePickerProps {
    field: FieldInputProps<Date>
    form: FormikProps<Date>
    props: Omit<ReactDatePickerProps, 'onChange'>
}

const DatePicker = ({ form, field, props }: DatePickerProps): JSX.Element => {
    const [startDate, setStartDate] = useState<Date | null>(new Date())
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        if (startDate !== field.value) form.setFieldValue(field.name, startDate)
    }, [startDate, form, field.name, field.value])

    return (
        <ReactDatePicker
            className="border-2 border-black text-black"
            selected={startDate}
            {...props}
            onChange={(date: Date) => setStartDate(new Date(date))}
        />
    )
}
