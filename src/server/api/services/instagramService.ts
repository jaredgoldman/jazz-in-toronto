import { EventWithBandVenue } from '~/types/data'
import CanvasService from './canvasService'

export default class InstagramService {
    private events: EventWithBandVenue[]

    constructor(events: EventWithBandVenue[]) {
        this.events = events
    }

    public async createSavePost(
        canvasService: CanvasService,
        date: Date
    ): Promise<void> {
        const fileUrls = this.createPost(canvasService, date)
        if (fileUrls) {
            const storedUrls = await this.storePosts(fileUrls)
            await this.postPosts(storedUrls)
            await this.deleteStored(storedUrls)
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
            // catch errors
            throw new Error()
        }
    }

    private async storePosts(fileUrls: string[]): Promise<Array<string>> {
        const storedUrls: Array<string> = []
        fileUrls.forEach((fileUrl) => {
            try {
                // store post on storage bucket
                // cloudinary? S3? GCP?
            } catch (e) {}
        })
        return storedUrls
    }

    private async postPosts(storedUrls: string[]): Promise<void> {
        storedUrls.forEach((storedUrl) => {
            try {
                // post each image to insta
            } catch (e) {}
        })
    }

    private async deleteStored(storedUrls: string[]): Promise<void> {
        storedUrls.forEach((storedUrl) => {
            try {
                // delete each image from cloud provider
                // delete each image locally
            } catch (e) {}
        })
    }
}
