import { useState } from 'react'
import FileUploadButton from '~/components/FileUploadButton'
import Image from 'next/image'
import { type FileData } from '~/types/data'

interface Props {
    className?: string
    buttonClassName: string
    buttonLabel?: string
    showPreview?: boolean
}

export default function UploadField({
    className,
    buttonClassName,
    buttonLabel = 'Upload',
    showPreview = true
}: Props) {
    const [fileData, setFileData] = useState<FileData>()

    const onUpload = (fileData: FileData) => {
        setFileData(fileData)
    }

    return (
        <div className={className}>
            <FileUploadButton
                className={buttonClassName}
                onUpload={onUpload}
                label={buttonLabel}
            />
            {showPreview && fileData && (
                <Image
                    src={fileData.dataURL}
                    alt="Uploaded image"
                    width={200}
                    height={200}
                />
            )}
        </div>
    )
}
