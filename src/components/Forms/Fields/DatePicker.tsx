// Libraries
import ReactDatePicker, { type ReactDatePickerProps } from 'react-datepicker'
import * as Form from '@radix-ui/react-form'
import 'react-datepicker/dist/react-datepicker.css'
import { Flex, Text } from '@radix-ui/themes'
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
    required?: boolean | string
    datePickerProps?: Omit<ReactDatePickerProps, 'onChange'>
}

export default function DatePickerField<T extends FieldValues>({
    label,
    name,
    error,
    control,
    required = false,
    datePickerProps
}: Props<T>): JSX.Element {
    return (
        <Controller
            control={control}
            rules={{ required }}
            name={name}
            render={({ field: { onChange, onBlur, value } }) => (
                <Form.Field name={name}>
                    <Flex direction="column" width="100%" mb="3">
                        <Form.Label>{label}</Form.Label>
                        <ReactDatePicker
                            className="min-w-full rounded-[4px] border-[1px] border-gray-300 p-[0.325rem] text-sm"
                            onChange={onChange}
                            onBlur={onBlur}
                            selected={value}
                            {...datePickerProps}
                        />
                    </Flex>
                    {error && (
                        <Text size="2" color="red">
                            {error.message}
                        </Text>
                    )}
                </Form.Field>
            )}
        />
    )
}
