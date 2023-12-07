import { ChangeEvent, useState, useRef, useEffect } from 'react'
import { FileData } from '~/types/data'
import { Flex } from '@radix-ui/themes'

interface Props {
    onUpload: (data: FileData) => Promise<void> | void
    label: string
}

const trimFileName = (originalFile: File) => {
    const trimmedName = originalFile.name.trim()
    return new File([originalFile], trimmedName, {
        type: originalFile.type,
        lastModified: originalFile.lastModified
    })
}

/*
 * Re-usable file upload component
 */
const FileUploadButton = ({ onUpload, label }: Props) => {
    const [selectedFile, setSelectedFile] = useState<FileData | null>(null)

    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (selectedFile) {
            void onUpload(selectedFile)
        }
    }, [selectedFile, onUpload])

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const dataURL = URL.createObjectURL(file)
            setSelectedFile({ file: trimFileName(file), dataURL })
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
                name="file"
            ></input>
            <Flex onClick={handleButtonClick}>{label}</Flex>
        </>
    )
}

export default FileUploadButton
