import { Field, ErrorMessage } from 'formik'

interface Props {
    name: string
    label?: string
    className?: string
    placeHolder?: string
    fieldClassName?: string
}

export default function NumberField({
    name,
    label = 'Phone Number',
    className = 'flex flex-col mb-5',
    fieldClassName = 'text-black',
    placeHolder = 'Enter your phone number'
}: Props): JSX.Element {
    return (
        <div className={className}>
            <label htmlFor={name}>{label}</label>
            <Field
                className={fieldClassName}
                name={name}
                type="number"
                placeHolder={placeHolder}
            />
            <ErrorMessage name={name} />
        </div>
    )
}
