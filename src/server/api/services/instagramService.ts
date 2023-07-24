import { EventWithBandVenue } from '~/types/data'
import CanvasService from './canvasService'
import { removeTempFolderContents } from '~/utils/file'

export default class InstagramService {
    private events: EventWithBandVenue[]

    constructor(events: EventWithBandVenue[]) {
        this.events = events
    }

    public async createSavePost(
        canvasService: CanvasService,
        date: Date
    ): Promise<string[]> {
        const fileUrls = this.createPost(canvasService, date)
        if (fileUrls) {
            const storedUrls = await this.storePosts(fileUrls)
            await this.post(storedUrls)
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
        fileUrls.forEach((fileUrl) => {
            try {
                // store post on storage bucket
                // cloudinary? S3? GCP?
                // Locally?
                storedUrls.push(fileUrl)
            } catch (e) {
                throw new Error("Couldn't store posts")
            }
        })
        return storedUrls
    }

    private async post(storedUrls: string[]): Promise<void> {
        storedUrls.forEach((storedUrl) => {
            try {
                // post each image to insta
            } catch (e) {}
        })
    }

    // XXX: Currently deleting locally but should be moved to
    // a block storage provider later
    private async deleteStored(): Promise<void> {
        removeTempFolderContents()
    }
}
