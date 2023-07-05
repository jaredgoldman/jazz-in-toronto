import { Field, ErrorMessage } from "formik"

interface SelectProps {
    label: string
    name: string
    className?: string
    options: {
        label: string
        value: string
    }[] | undefined
    fieldClassName?: string
    errorMessage?: string
}

export default function Select({
    label,
    name,
    options,
    className = "m-2",
    fieldClassName = "mb-5 border-2 border-black"
}: SelectProps): JSX.Element {
    return (
        <div className={className}>
            <label>{label}</label>
            <Field className={fieldClassName} name={name} as="select">
                <option value="">Select a {label}</option>
                {options?.map((option) => {
                    ;<option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                })}
            </Field>
            <ErrorMessage name={name} component="div" />
        </div>
    )
}
