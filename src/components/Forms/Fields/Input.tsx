// Components
import * as Form from '@radix-ui/react-form'
import { TextField } from '@radix-ui/themes'
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
    type: string
    control: Control<T>
    error?: FieldError
}

export default function Input<T extends FieldValues>({
    label,
    name,
    type = 'text',
    error,
    control
}: Props<T>): JSX.Element {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <Form.Field name={name}>
                    <Form.Label>{label}</Form.Label>
                    <Form.Control asChild>
                        <TextField.Input type={type} {...field} />
                    </Form.Control>
                    {error && (
                        <Form.Message match="valid">
                            {error.message}
                        </Form.Message>
                    )}
                </Form.Field>
            )}
        />
    )
}
