// Components
import * as Form from '@radix-ui/react-form'
import { TextField, Text } from '@radix-ui/themes'
import {
    FieldError,
    Controller,
    Control,
    FieldValues,
    Path
} from 'react-hook-form'

interface Props<T extends FieldValues> {
    label: string
    name: Path<T>
    type?: string
    control: Control<T>
    error?: FieldError
    required?: boolean | string
}

export default function Input<T extends FieldValues>({
    label,
    name,
    type = 'text',
    error,
    control,
    required = false
}: Props<T>): JSX.Element {
    return (
        <Controller
            control={control}
            rules={{ required }}
            name={name}
            render={({ field }) => (
                <Form.Field name={name}>
                    <Form.Label>{label}</Form.Label>
                    <Form.Control asChild>
                        <TextField.Input type={type} {...field} />
                    </Form.Control>
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
