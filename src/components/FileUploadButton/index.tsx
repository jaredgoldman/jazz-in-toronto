// Libraries
import { type ChangeEvent, useState, useRef, useEffect } from 'react'
import { type FileData } from '~/types/data'
// Components
import { Button, Flex } from '@radix-ui/themes'

interface Props {
    onUpload: (data: FileData) => Promise<void> | void
    label: string
    name?: string
    buttonComponent?: JSX.Element
    isPostUpload?: boolean
}

const trimFileName = (originalFile: File) => {
    const trimmedName = originalFile.name.trim()
    return new File([originalFile], trimmedName, {
        type: originalFile.type,
        lastModified: originalFile.lastModified
    })
}

const FileUploadButton = ({ onUpload, label }: Props) => {
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
            <Flex width="100%" justify="center">
                <Button onClick={handleButtonClick}>{label}</Button>
            </Flex>
        </>
    )
}

export default FileUploadButton
