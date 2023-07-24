import { useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import { FieldInputProps, FormikProps, Field, ErrorMessage } from 'formik'
import 'react-datepicker/dist/react-datepicker.css'

interface Props {
    label: string
    name: string
    className?: string
    fieldClassName?: string
    showTimeSelect?: boolean
}

export default function DatePickerField({
    label,
    name,
    className = 'flex flex-col m-2',
    fieldClassName = 'mb-5 border-2 border-black',
    showTimeSelect = true
}: Props): JSX.Element {
    return (
        <div className={className}>
            <label>{label}</label>
            <Field
                name={name}
                className={fieldClassName}
                component={DatePicker}
                props={{ showTimeSelect }}
            />
            <ErrorMessage name={name} component="div" />
        </div>
    )
}

interface DatePickerProps {
    field: FieldInputProps<Date>
    form: FormikProps<any>

    props: {
        showTimeSelect: boolean
    }
}

const DatePicker = ({
    form,
    field,
    props: { showTimeSelect }
}: DatePickerProps): JSX.Element => {
    const [startDate, setStartDate] = useState<Date | null>(new Date())
    useEffect(() => {
        if (startDate !== field.value) form.setFieldValue(field.name, startDate)
    }, [startDate, form, field.name])

    const dateFormat = showTimeSelect ? 'MM/dd/yyyy h:mm aa' : 'MM/dd/yyyy'
    return (
        <ReactDatePicker
            selected={startDate}
            onChange={(date: Date) => setStartDate(new Date(date))}
            showTimeSelect={showTimeSelect}
            dateFormat={dateFormat}
        />
    )
}
