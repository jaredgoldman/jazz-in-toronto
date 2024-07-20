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
import type { Venue, Artist } from '~/types/data'
import {
    FieldValues,
    FieldError,
    Control,
    Path,
    Controller,
    ControllerRenderProps
} from 'react-hook-form'
import { ReactNode, useState } from 'react'

type Props<TData extends FieldValues> = {
    label?: string | ReactNode
    name: Path<TData>
    optionData: Venue[] | Artist[] | { id: string; name: string }[]
    value?: string
    control?: Control<TData>
    error?: FieldError
    required?: boolean | string
    onChange?: (value: string) => void
}

type BaseSelectProps<TData extends FieldValues> = {
    name: string
    label?: string | ReactNode
    options: JSX.Element[]
    onChange?: (value: string) => void
    field?: ControllerRenderProps<TData, Path<TData>>
    value?: string
}

export default function Select<T extends FieldValues>({
    label,
    name,
    error,
    optionData,
    control,
    required = false,
      value,
    onChange
}: Props<T>) {
    const options = optionData.map((option) => (
        <SelectItem key={option.id} value={option.id}>
            {option.name}
        </SelectItem>
    ))

    const BaseSelect = <TData extends FieldValues>({
        name,
        label,
        field,
        value,
        options,
        onChange
    }: BaseSelectProps<TData>) => {
        const [selectedValue, setSelectedValue] = useState(value || '')

        const handleValueChange = (value: string) => {
            setSelectedValue(value)
            if (field) {
                field.onChange(value)
            } else if (onChange) {
                onChange(value)
            }
        }

        return (
            <SelectRoot
                onValueChange={handleValueChange}
                {...(field ? field : {})} // Conditionally apply field props if field is provided
                value={selectedValue}
            >
                <SelectTrigger>{`Select a ${name}`}</SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>{label}</SelectLabel>
                        {options}
                    </SelectGroup>
                </SelectContent>
            </SelectRoot>
        )
    }
    if (!control) {
        return (
            <BaseSelect
                name={name}
                label={label}
                options={options}
                onChange={onChange}
                value={value}
            />
        )
    }

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
                            <BaseSelect
                                name={name}
                                label={label}
                                options={options}
                                field={field}
                            />
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
