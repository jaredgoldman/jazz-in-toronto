import { FieldValues, UseFormSetValue, Path, PathValue } from 'react-hook-form'

/**
 * Ensure we have a valid file name by trimming any whitespace
 * @param {File} originalFile - The original file
 * @returns {File} - The trimmed file
 */
export const trimFileName = (originalFile: File) => {
    const trimmedName = originalFile.name.trim()
    return new File([originalFile], trimmedName, {
        type: originalFile.type,
        lastModified: originalFile.lastModified
    })
}

/**
 * Set multiple form values at once
 * @param {Partial<Record<Path<T>, PathValue<T, Path<T>>>>} values - The values to set
 * @param {UseFormSetValue<T>} setValue - The setValue function from react-hook-form
 */
export const setFormValues = <T extends FieldValues>(
    values: Partial<Record<Path<T>, PathValue<T, Path<T>>>>,
    setValue: UseFormSetValue<T>
) => {
    Object.entries(values).forEach(([key, value]) => {
        setValue(key as Path<T>, value as PathValue<T, Path<T>>)
    })
}
