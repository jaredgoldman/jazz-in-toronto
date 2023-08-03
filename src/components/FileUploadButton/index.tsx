import { type ChangeEvent, useState, useRef, useEffect } from 'react'
import { type FileData } from '~/types/data'

interface Props {
    onUpload: (data: FileData) => void
}

const FileUploadButton = ({ onUpload }: Props) => {
    const [selectedFile, setSelectedFile] = useState<FileData | null>(null)

    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (selectedFile) {
            onUpload(selectedFile)
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
        <div className="my-2 flex flex-col justify-center border-white hover:border">
            <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                ref={fileInputRef}
            ></input>
            <button type="button" onClick={handleButtonClick}>
                +
            </button>
        </div>
    )
}

export default FileUploadButton
