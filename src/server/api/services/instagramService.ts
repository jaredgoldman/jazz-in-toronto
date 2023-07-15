import { EventWithBandVenue } from '~/types/data'
import CanvasService from './canvasService'

export default class InstagramService {
    private events: EventWithBandVenue[]

    constructor(events: EventWithBandVenue[]) {
        this.events = events
    }

    public async createPost(canvasSerice: CanvasService, date: Date) {
        canvasSerice.createPostImages(this.events, date)
    }
}
