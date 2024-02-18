import { FieldValues, UseFormSetValue, Path, PathValue } from 'react-hook-form'

// Ensure we have a valid file name by trimming any whitespace
export const trimFileName = (originalFile: File) => {
    const trimmedName = originalFile.name.trim()
    return new File([originalFile], trimmedName, {
        type: originalFile.type,
        lastModified: originalFile.lastModified
    })
}

// Set multiple form values at once
export const setFormValues = <T extends FieldValues>(
    values: Partial<Record<Path<T>, PathValue<T, Path<T>>>>,
    setValue: UseFormSetValue<T>
) => {
    Object.entries(values).forEach(([key, value]) => {
        setValue(key as Path<T>, value as PathValue<T, Path<T>>)
    })
}
