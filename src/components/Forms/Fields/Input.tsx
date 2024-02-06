import { ReactNode } from 'react'
import * as Form from '@radix-ui/react-form'
import { TextField, Text, TextArea } from '@radix-ui/themes'
import {
    FieldError,
    FieldValues,
    Path,
    Control,
    Controller
} from 'react-hook-form'

interface Props<T extends FieldValues> {
    label: string | ReactNode
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
                        {type === 'textarea' ? (
                            <TextArea {...field} />
                        ) : (
                            <TextField.Input type={type} {...field} />
                        )}
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
