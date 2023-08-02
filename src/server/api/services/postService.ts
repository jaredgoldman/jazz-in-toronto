import { utapi } from 'uploadthing/server'

interface PostedImageData {
    fileUrl: string
    fileKey: string
}

export default class postService {
    private postedImageData: PostedImageData[]

    constructor(postedImageData: PostedImageData[]) {
        this.postedImageData = postedImageData
    }

    async postAndDeleteImages() {
        await this.deletePostedImages()
    }

    async deletePostedImages() {
        // delete imag
        const fileKeys = this.postedImageData.map(
            (file: PostedImageData) => file.fileKey
        )
        const { success } = await utapi.deleteFiles(fileKeys)
        if (!success) {
            throw new Error('Failed to delete files')
        }
    }
}
