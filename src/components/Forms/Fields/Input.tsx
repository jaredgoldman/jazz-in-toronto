// Components
import { Field, ErrorMessage } from 'formik'

interface InputProps {
    name: string
    label: string
    placeHolder?: string
}

export default function Input({
    label,
    name,
    placeHolder
}: InputProps): JSX.Element {
    return (
        <div className="mb-5 flex flex-col">
            <label>{label}</label>
            <Field
                name={name}
                className="border-2 border-black text-black placeholder-black dark:border-white "
                placeHolder={placeHolder}
            />
            <ErrorMessage name={name} />
        </div>
    )
}
