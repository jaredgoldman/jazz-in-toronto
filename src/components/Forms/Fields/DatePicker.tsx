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
    outerOnChange?: (startDate: Date) => void
    datePickerProps?: Omit<ReactDatePickerProps, 'onChange'>
    adjustZIndex?: boolean
}

export default function DatePickerField({
    label,
    name,
    className = 'flex flex-col mb-5',
    fieldClassName = 'mb-5 border-2 border-black text-black',
    outerOnChange,
    datePickerProps
}: Props): JSX.Element {
    return (
        <div className={className}>
            <label>{label}</label>
            <Field
                name={name}
                className={fieldClassName}
                component={DatePicker}
                props={{ ...datePickerProps, outerOnChange }}
            />
            <ErrorMessage name={name} component="div" />
        </div>
    )
}

interface DatePickerProps {
    field: FieldInputProps<Date>
    form: FormikProps<Date>
    props: ReactDatePickerProps & {
        outerOnChange?: (startDate: Date) => void
    }
}

const DatePicker = ({ form, field, props }: DatePickerProps): JSX.Element => {
    const [startDate, setStartDate] = useState<Date | null>(new Date())
    useEffect(() => {
        const setStartDateFromField = async () => {
            if (startDate && startDate !== field.value) {
                props.outerOnChange && props.outerOnChange(startDate)
                await form.setFieldValue(field.name, startDate)
            }
        }
        void setStartDateFromField()
    }, [startDate, form, field.name, field.value, props])

    return (
        <ReactDatePicker
            className={`datepicker relative w-full border-2 border-b`}
            selected={startDate}
            {...props}
            onChange={(date: Date) => setStartDate(new Date(date))}
        />
    )
}
