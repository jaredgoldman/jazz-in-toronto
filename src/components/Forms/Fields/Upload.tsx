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
        <div className="flex flex-col items-center">
            <label className="mb-2">{label}</label>
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
        <div className="mb-3 flex w-full flex-col items-center">
            <div className="flex w-full flex-col items-center">
                {!src && (
                    <FileUploadButton
                        onUpload={onSaveFile}
                        label={buttonLabel}
                        name={name}
                    />
                )}
                {showPreview && src && (
                    <div className="flex w-full items-center justify-evenly">
                        <div className="relative">
                            <Button
                                absolutePosition="absolute top-0 left-0"
                                size="2xs"
                                onClick={() => void removeFile()}
                            >
                                X
                            </Button>
                            <Image
                                className="m-3"
                                src={src}
                                height={50}
                                width={50}
                                alt="Uploaded image"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
