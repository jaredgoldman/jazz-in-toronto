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
}

// Pass component through Formik so it's value is represened in Formik state
export default function UploadField({
    name,
    label = 'Upload a file',
    buttonLabel,
    className,
    buttonClassName,
    showPreview,
    photoPath
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
                    photoPath
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
        photoPath
    }
}: UploadProps) => {
    const [fileData, setFileData] = useState<FileData | undefined>()
    const onSaveFile = async (fileData: FileData) => {
        setFileData(fileData)
        await form.setFieldValue(name, fileData)
    }

    const removeFile = () => {
        setFileData(undefined)
    }

    const src = photoPath || fileData?.dataURL

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
                        {!photoPath && (
                            <Button
                                onClick={removeFile}
                                className="absolute right-0 top-0"
                            >
                                X
                            </Button>
                        )}
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
