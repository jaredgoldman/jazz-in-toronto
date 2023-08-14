// Libraries
import ReactDatePicker, { type ReactDatePickerProps } from 'react-datepicker'
import * as Form from '@radix-ui/react-form'
import 'react-datepicker/dist/react-datepicker.css'
import { Flex } from '@radix-ui/themes'
import {
    FieldError,
    Controller,
    FieldValues,
    Control,
    Path
} from 'react-hook-form'

interface Props<T extends FieldValues> {
    label: string
    name: Path<T>
    control: Control<T>
    error?: FieldError
    fieldProps?: ReactDatePickerProps
}

export default function DatePickerField<T extends FieldValues>({
    label,
    name,
    error,
    control
}: Props<T>): JSX.Element {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, onBlur, value } }) => (
                <Form.Field name={name}>
                    <Flex direction="column">
                        <Form.Label>{label}</Form.Label>
                        <ReactDatePicker
                            onChange={onChange}
                            onBlur={onBlur}
                            selected={value}
                        />
                    </Flex>
                    {error && (
                        <Form.Message match="valueMissing">
                            {error.message}
                        </Form.Message>
                    )}
                </Form.Field>
            )}
        />
    )
}
