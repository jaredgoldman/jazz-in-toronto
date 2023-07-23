import { useContext } from 'react'
import { ModalContext } from '~/components/Modal/context/ModalContext'
import { ModalForms } from '~/components/Modal/types'
import { Field, ErrorMessage } from 'formik'
import { Venue, Band } from '@prisma/client'
import Button from '~/components/Button'

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
    className = 'm-2 flex flex-col',
    fieldClassName = 'flex items-center border-2 border-black'
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
            <label>{label}</label>
            <div className="flex items-center">
                <Field className={fieldClassName} name={name} as="select">
                    <option value="">Select a {label}</option>
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
