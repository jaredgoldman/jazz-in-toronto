import { ChangeEvent, useState, useRef, useEffect } from 'react'
import PostImage from '../Forms/PostGenerator/components/postImage'

interface Props {
    onUpload: (data: { file: File; dataURL: string }) => void
}

const FileUploadButton = ({ onUpload }: Props) => {
    const [selectedFile, setSelectedFile] = useState<{
        file: File
        dataURL: string
    } | null>(null)

    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (selectedFile) {
            onUpload(selectedFile)
        }
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
            {selectedFile ? (
                <PostImage src={selectedFile.dataURL} />
            ) : (
                <div className="flex flex-col justify-center p-2">
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
            )}
        </>
    )
}

export default FileUploadButton
