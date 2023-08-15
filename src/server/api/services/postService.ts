import { TRPCError } from '@trpc/server'
import { utapi } from 'uploadthing/server'

interface PostedImageData {
    files: {
        fileUrl: string
        fileKey: string
    }[]
    caption: string
}

export default class postService {
    private postedImageData!: PostedImageData

    init(postedImageData: PostedImageData) {
        this.postedImageData = postedImageData
    }

    async postAndDeleteImages() {
        if (!this.postedImageData) {
            throw new TRPCError({
                message: 'No image data to delete',
                code: 'BAD_REQUEST'
            })
        }
        await this.deletePostedImages()
    }

    async deletePostedImages() {
        // delete imag
        const fileKeys = this.postedImageData.files.map((file) => file.fileKey)
        const { success } = await utapi.deleteFiles(fileKeys)
        if (!success) {
            throw new TRPCError({
                message: 'Failed to delete files',
                code: 'INTERNAL_SERVER_ERROR'
            })
        }
    }
}
