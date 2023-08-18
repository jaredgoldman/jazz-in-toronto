// Components
import * as Form from '@radix-ui/react-form'
import {
    Flex,
    SelectRoot,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectGroup,
    Text,
    SelectLabel
} from '@radix-ui/themes'
// Types
import type { Venue, Artist } from '~/types/data'
// Context
import {
    type FieldValues,
    type FieldError,
    type Control,
    type Path,
    Controller
} from 'react-hook-form'

interface Props<T extends FieldValues> {
    label: string
    name: Path<T>
    optionData: Venue[] | Artist[]
    control: Control<T>
    error?: FieldError
    required?: boolean | string
}

export default function Select<T extends FieldValues>({
    label,
    name,
    error,
    optionData,
    control,
    required = false
}: Props<T>): JSX.Element {
    const mappedOptions = optionData.map((option) => {
        return {
            value: option.id,
            label: option.name
        }
    })

    return (
        <Controller
            rules={{ required }}
            control={control}
            name={name}
            render={({ field }) => (
                <Form.Field name={name}>
                    <Form.Label>{label}</Form.Label>
                    <Flex direction="column">
                        <Form.Control asChild>
                            <SelectRoot
                                onValueChange={field.onChange}
                                {...field}
                            >
                                <SelectTrigger>
                                    ${`Select a ${name}`}
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>{label}</SelectLabel>
                                        {mappedOptions.map((option) => {
                                            return (
                                                <SelectItem
                                                    key={option.value}
                                                    value={option.value}
                                                >
                                                    {option.label}
                                                </SelectItem>
                                            )
                                        })}
                                    </SelectGroup>
                                </SelectContent>
                            </SelectRoot>
                        </Form.Control>
                        {error && (
                            <Text size="2" color="red">
                                {error.message}
                            </Text>
                        )}
                    </Flex>
                </Form.Field>
            )}
        />
    )
}
