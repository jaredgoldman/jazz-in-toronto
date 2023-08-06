import { type ChangeEvent, useState, useRef, useEffect } from 'react'
import Button from '../Button'
import { type FileData } from '~/types/data'

interface Props {
    onUpload: (data: FileData) => Promise<void> | void
    className?: string
    label: string
    name?: string
}

const trimFileName = (originalFile: File) => {
    const trimmedName = originalFile.name.trim()
    return new File([originalFile], trimmedName, {
        type: originalFile.type,
        lastModified: originalFile.lastModified
    })
}

const FileUploadButton = ({
    onUpload,
    label,
    className,
    name = 'file'
}: Props) => {
    const [selectedFile, setSelectedFile] = useState<FileData | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (selectedFile) {
            void onUpload(selectedFile)
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFile])

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        setIsLoading(true)
        const file = event.target.files?.[0]
        if (file) {
            const dataURL = URL.createObjectURL(file)
            setSelectedFile({ file: trimFileName(file), dataURL })
        }
        setIsLoading(false)
    }

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }

    return (
        <>
            <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                ref={fileInputRef}
                name={name}
            ></input>
            <Button
                type="button"
                className={className}
                onClick={handleButtonClick}
                isLoading={isLoading}
                disabled={isLoading}
            >
                {label}
            </Button>
        </>
    )
}

export default FileUploadButton
