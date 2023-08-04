import { type ChangeEvent, useState, useRef, useEffect } from 'react'
import Button from '../Button'
import { type FileData } from '~/types/data'

interface Props {
    onUpload: (data: FileData) => Promise<void>
    className?: string
    label: string
    name?: string
}

const FileUploadButton = ({
    onUpload,
    label,
    className,
    name = 'file'
}: Props) => {
    const [selectedFile, setSelectedFile] = useState<FileData | null>(null)

    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (selectedFile) {
            void onUpload(selectedFile)
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFile])

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const dataURL = URL.createObjectURL(file)
            setSelectedFile({ file, dataURL })
        }
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
            >
                {label}
            </Button>
        </>
    )
}

export default FileUploadButton
