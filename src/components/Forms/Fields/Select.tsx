// Components
import { Field, ErrorMessage } from 'formik'
import { type ModalForms } from '~/components/Modal/types'
import Button from '~/components/Button'
// Types
import { type Venue, type Band } from '~/types/data'
// Context
import { useContext } from 'react'
import { ModalContext } from '~/components/Modal/context/ModalContext'

interface SelectProps {
    label: string
    name: string
    optionData: Venue[] | Band[]
    modalForm?: ModalForms
    className?: string
    fieldClassName?: string
    errorMessage?: string
}

export default function Select({
    label,
    name,
    optionData,
    modalForm,
    className = 'flex flex-col mb-5',
    fieldClassName = 'flex items-center border-2 border-black mb-2 text-black'
}: SelectProps): JSX.Element {
    const { handleModalForm } = useContext(ModalContext)
    const mappedOptions = optionData.map((option) => {
        return {
            value: option.id,
            label: option.name
        }
    })

    return (
        <div className={className}>
            <label className="mb-1">{label}</label>
            <div className="flex flex-col">
                <Field className={fieldClassName} name={name} as="select">
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
                {modalForm && (
                    <Button
                        onClick={() => handleModalForm(modalForm)}
                    >{`Add new ${modalForm.toLowerCase()}`}</Button>
                )}
            </div>
            <ErrorMessage name={name} component="div" />
        </div>
    )
}
