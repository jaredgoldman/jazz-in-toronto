import { utapi } from 'uploadthing/server'

interface PostedImageData {
    files: {
        fileUrl: string
        fileKey: string
    }[]
    caption: string
}

export default class postService {
    private postedImageData: PostedImageData

    constructor(postedImageData: PostedImageData) {
        this.postedImageData = postedImageData
    }

    async postAndDeleteImages() {
        await this.deletePostedImages()
    }

    async deletePostedImages() {
        // delete imag
        const fileKeys = this.postedImageData.files.map((file) => file.fileKey)
        const { success } = await utapi.deleteFiles(fileKeys)
        if (!success) {
            throw new Error('Failed to delete files')
        }
    }
}
