// Components
import { Field, ErrorMessage } from 'formik'

interface InputProps {
    name: string
    label: string
    className?: string
    fieldClassName?: string
}

export default function Input({
    label,
    name,
    className = 'flex flex-col w-2/5',
    fieldClassName = 'mb-5 border-2 border-black'
}: InputProps): JSX.Element {
    return (
        <div className={className}>
            <label className="mb-1">{label}</label>
            <Field name={name} className={fieldClassName} />
            <ErrorMessage name={name} />
        </div>
    )
}
