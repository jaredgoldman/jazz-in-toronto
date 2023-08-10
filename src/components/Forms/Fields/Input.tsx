// Components
import { Field, ErrorMessage } from 'formik'

interface InputProps {
    name: string
    label: string
    className?: string
    fieldClassName?: string
    placerHolder?: string
}

export default function Input({
    label,
    name,
    className = 'flex flex-col mb-5',
    fieldClassName = 'border-2 border-black dark:border-white text-black ',
    placerHolder
}: InputProps): JSX.Element {
    return (
        <div className={className}>
            <label>{label}</label>
            <Field
                name={name}
                className={fieldClassName}
                placeHolder={placerHolder}
            />
            <ErrorMessage name={name} />
        </div>
    )
}
