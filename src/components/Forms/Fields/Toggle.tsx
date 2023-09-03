// Libraries
import {
    Controller,
    Path,
    FieldValues,
    Control,
    FieldError
} from 'react-hook-form'
// Components
import { Switch, Text } from '@radix-ui/themes'
import * as Form from '@radix-ui/react-form'

interface Props<T extends FieldValues> {
    label: string
    name: Path<T>
    control: Control<T>
    error?: FieldError
    required?: boolean | string
}

export default function Toggle<T extends FieldValues>({
    label,
    name,
    control,
    error,
    required
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
                        <Switch {...field} />
                    </Form.Control>
                    {error && (
                        <Text size="2" color="red">
                            {error.message}
                        </Text>
                    )}
                </Form.Field>
            )}
        ></Controller>
    )
}
