import { ChangeEvent, useState, useRef } from 'react'

const FileUploadButton = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        setSelectedFile(file || null)
    }

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }

    return (
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
        // {selectedFile && <p>Selected file: {selectedFile.name}</p>}
    )
}

export default FileUploadButton
