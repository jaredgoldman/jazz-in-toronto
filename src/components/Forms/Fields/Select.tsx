import { useContext } from 'react'
// Components
import * as Form from '@radix-ui/react-form'
import {
    Flex,
    Button,
    SelectRoot,
    SelectTrigger,
    SelectContent,
    SelectItem,
    Text
} from '@radix-ui/themes'
// Types
import { type Venue, type Band } from '~/types/data'
import {
    type ModalContextType,
    type ModalForms
} from '~/components/Modal/types'
// Context
import { ModalContext } from '~/components/Modal/context/ModalContext'
import {
    FieldError,
    Control,
    FieldValues,
    Controller,
    Path
} from 'react-hook-form'

interface Props<T extends FieldValues> {
    label: string
    name: Path<T>
    optionData: Venue[] | Band[]
    control: Control<T>
    error?: FieldError
    modalForm?: ModalForms
    onAdd?: (value: Band | Venue) => Promise<void>
    buttonText?: string
    buttonDisabled?: boolean
    required?: boolean | string
}

export default function Select<T extends FieldValues>({
    label,
    name,
    error,
    optionData,
    control,
    modalForm,
    onAdd,
    buttonText = `Add an item`,
    buttonDisabled = false,
    required = false
}: Props<T>): JSX.Element {
    const { handleModalForm } = useContext(ModalContext) as ModalContextType
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
                                <SelectTrigger></SelectTrigger>
                                <SelectContent>
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
                                </SelectContent>
                            </SelectRoot>
                        </Form.Control>
                        {error && (
                            <Text size="2" color="red">
                                {error.message}
                            </Text>
                        )}
                        {modalForm && (
                            <Button
                                onClick={() =>
                                    handleModalForm(modalForm, undefined, onAdd)
                                }
                                disabled={buttonDisabled}
                            >
                                {buttonText}
                            </Button>
                        )}
                    </Flex>
                </Form.Field>
            )}
        />
    )
}
