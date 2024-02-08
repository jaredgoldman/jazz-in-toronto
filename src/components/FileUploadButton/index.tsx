import { ChangeEvent, useState, useRef, useEffect, useCallback } from 'react'
import { Flex } from '@radix-ui/themes'
import { FileData } from '~/types/data'

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
    const [file, setFile] = useState<FileData | undefined>()
    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (file) {
            void onUpload(file)
        }
    }, [file, onUpload])

    const handleFileChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0]
            if (file) {
                const dataURL = URL.createObjectURL(file)
                setFile({ file: trimFileName(file), dataURL })
            }
            event.target.value = ''
        },
        []
    )

    const handleButtonClick = useCallback(() => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }, [fileInputRef])

    return (
        <>
            <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                ref={fileInputRef}
                name="file"
            ></input>
            <Flex
                width="100%"
                height="9"
                justify="center"
                align="center"
                onClick={handleButtonClick}
            >
                {label}
            </Flex>
        </>
    )
}

export default FileUploadButton
