// Components
import { Field, ErrorMessage } from 'formik'
import Button from '~/components/Button'
// Types
import { type Venue, type Band } from '~/types/data'
import {
    type ModalContextType,
    type ModalForms
} from '~/components/Modal/types'
// Context
import { useContext } from 'react'
import { ModalContext } from '~/components/Modal/context/ModalContext'
import classnames from 'classnames'

interface SelectProps {
    label: string
    name: string
    optionData: Venue[] | Band[]
    modalForm?: ModalForms
    error?: string
    onAdd?: (value: Band | Venue) => Promise<void>
    buttonText?: string
    buttonDisabled?: boolean
}

export default function Select({
    label,
    name,
    optionData,
    modalForm,
    error,
    onAdd,
    buttonText = `Add an item`,
    buttonDisabled = false
}: SelectProps): JSX.Element {
    const { handleModalForm } = useContext(ModalContext) as ModalContextType
    const mappedOptions = optionData.map((option) => {
        return {
            value: option.id,
            label: option.name
        }
    })
    console.log('ERROR', error)
    return (
        <div className={`flex flex-col`}>
            <label className="mb-1">{label}</label>
            <div className="flex flex-col">
                <Field
                    name={name}
                    as="select"
                    className={classnames({ 'mb-5': modalForm && !error })}
                >
                    <option value="" disabled selected>
                        Select a {label}
                    </option>
                    {mappedOptions.map((option) => {
                        return (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        )
                    })}
                </Field>
                <ErrorMessage
                    className={classnames({ 'mb-5': modalForm && !error })}
                    name={name}
                    component="div"
                />
                {modalForm && (
                    <div className="flex w-full justify-center">
                        <Button
                            onClick={() =>
                                handleModalForm(modalForm, undefined, onAdd)
                            }
                            disabled={buttonDisabled}
                        >
                            {buttonText}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
