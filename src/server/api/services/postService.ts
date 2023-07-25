// Types
import { type EventWithBandVenue } from '~/types/data'
// Services
import type CanvasService from './canvasService'

export default class postService {
    private events: EventWithBandVenue[]
    private cloudinary: any

    constructor(events: EventWithBandVenue[], cloudinary: any) {
        this.events = events
        this.cloudinary = cloudinary

        cloudinary.config({
            secure: true
        })
    }

    public async createSavePost(
        canvasService: CanvasService,
        date: Date
    ): Promise<string[]> {
        const fileUrls = this.createPost(canvasService, date)
        if (fileUrls) {
            const storedUrls = await this.storePosts(fileUrls)
            await this.postToInstagram(storedUrls)
            return storedUrls
            // await this.deleteStored()
        } else {
            throw new Error('Error creating post')
        }
    }

    private createPost(
        canvasService: CanvasService,
        date: Date
    ): string[] | void {
        const fileUrls = canvasService.createPosts(this.events, date)
        if (fileUrls) {
            return fileUrls
        } else {
            throw new Error("Couldn't create posts")
        }
    }

    private async storePosts(fileUrls: string[]): Promise<Array<string>> {
        const storedUrls: Array<string> = []
        for (const fileUrl of fileUrls) {
            const options = {
                use_filename: true,
                unique_filename: false,
                overwrite: true
            }

            try {
                const result = await this.cloudinary.uploader.upload(
                    fileUrl,
                    options
                )
                storedUrls.push(result.secure_url)
            } catch (error) {
                throw new Error("Couldn't store posts")
            }
        }
        return storedUrls
    }

    private async postToInstagram(storedUrls: string[]): Promise<void> {
        storedUrls.forEach((storedUrl) => {
            try {
                // post each image to insta
            } catch (e) {}
        })
    }

    private async deleteStored(): Promise<void> {}
}
