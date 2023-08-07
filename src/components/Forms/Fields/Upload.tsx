import { useState } from 'react'
import FileUploadButton from '~/components/FileUploadButton'
import {
    type FieldInputProps,
    type FormikProps,
    Field,
    ErrorMessage
} from 'formik'
import Image from 'next/image'
import { type FileData } from '~/types/data'
import Button from '~/components/Button'

interface Props {
    name?: string
    label?: string
    buttonLabel?: string
    className?: string
    buttonClassName?: string
    showPreview?: boolean
    photoPath?: string
    itemId?: string
    onDeletePhoto?: () => Promise<void>
}

// Pass component through Formik so it's value is represened in Formik state
export default function UploadField({
    name,
    label = 'Upload a file',
    buttonLabel,
    className,
    buttonClassName,
    showPreview,
    photoPath,
    itemId,
    onDeletePhoto
}: Props) {
    return (
        <div>
            <label className="mb-1">{label}</label>
            <Field
                name={name}
                component={Upload}
                props={{
                    name,
                    buttonLabel,
                    className,
                    buttonClassName,
                    showPreview,
                    photoPath,
                    onDeletePhoto,
                    itemId
                }}
            />
            <ErrorMessage name={name} />
        </div>
    )
}

interface UploadProps {
    field: FieldInputProps<FileData>
    form: FormikProps<FileData>
    props: Props
}

const Upload = ({
    form,
    props: {
        name = 'file',
        buttonLabel = 'Upload',
        className = 'flex flex-col mb-5',
        buttonClassName = 'w-1/2 border-2 dark:border-white',
        showPreview = true,
        photoPath,
        onDeletePhoto
    }
}: UploadProps) => {
    const [src, setSrc] = useState<string>(photoPath || '')

    const onSaveFile = async (fileData: FileData): Promise<void> => {
        setSrc(fileData.dataURL)
        await form.setFieldValue(name, fileData)
    }

    const removeFile = async () => {
        // If a photoPath and updatemutation func were provided
        // we're editing and we can call the mutation to remove the photo
        if (photoPath && onDeletePhoto) {
            await onDeletePhoto()
        }
        setSrc('')
    }

    return (
        <div className={className}>
            <div className="flex">
                <FileUploadButton
                    className={buttonClassName}
                    onUpload={onSaveFile}
                    label={buttonLabel}
                    name={name}
                />
                {showPreview && src && (
                    <div className="relative h-20 w-20 object-contain">
                        <Button
                            onClick={() => void removeFile()}
                            className="absolute right-1 top-1"
                        >
                            X
                        </Button>
                        <Image
                            src={src}
                            alt="Uploaded image"
                            width={200}
                            height={200}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}
