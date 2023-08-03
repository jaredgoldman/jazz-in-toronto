import FileUploadButton from '~/components/FileUploadButton'
import { type FileData } from '~/types/data'

export default function UploadField() {
    const onUpload = ({ file }: FileData) => {
        console.log(file)
    }
    return <FileUploadButton onUpload={onUpload} />
}
