// Libraries
import {
    FieldError,
    FieldValues,
    Path,
    Control,
    Controller
} from 'react-hook-form'
// Commponents
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker'
import * as Form from '@radix-ui/react-form'
import { Flex, Text } from '@radix-ui/themes'
// Utils
import { useTheme } from 'next-themes'
// Assets
import 'react-datepicker/dist/react-datepicker.css'

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
    const { theme } = useTheme()
    const borderColor = theme === 'dark' ? 'gray-1000' : 'gray-300'
    const backgroundColor = theme === 'dark' ? 'gray-800' : 'white'
    const textColor = theme === 'dark' ? 'white-300' : 'gray-700'
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
                            className={`min-w-full rounded-[4px] border-[1px] border-${borderColor}-300 p-[0.325rem] bg-${backgroundColor} text-${textColor}}`}
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
