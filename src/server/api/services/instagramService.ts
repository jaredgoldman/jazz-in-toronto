import { createCanvas } from 'canvas'
import fs from 'fs'
import { EventWithBandVenue } from '~/types/data'

export default class InstagramService {
    private events: EventWithBandVenue[]

    constructor(events: EventWithBandVenue[]) {
        this.events = events
    }

    public async createPost() {
        await this.drawImage()
    }

    public async savePostLocally(canvasBuffer: Buffer) {
        console.log('Saving post locally')
        const filePath = 'src/temp/posts/test.png'
        return fs.writeFileSync(filePath, canvasBuffer)
    }

    private async drawImage(
        fillStyle: string = 'white',
        strokStyle: string = 'black'
    ) {
        console.log('Drawing image')
        const canvas = createCanvas(1080, 1080)
        const ctx = canvas.getContext('2d')

        // Set the background color to white
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Global sizes
        const rectWidth = canvas.width - canvas.width * 0.1
        const rectX = canvas.width * 0.05

        // Make title rect
        const titleRectHeight = canvas.height * 0.1
        const titleRectY = canvas.height * 0.05

        ctx.fillStyle = 'white'
        ctx.fillRect(rectX, titleRectY, rectWidth, titleRectHeight)
        ctx.strokeStyle = 'black'
        ctx.strokeRect(rectX, titleRectY, rectWidth, titleRectHeight)

        // draw main rect
        const mainRectHeight = canvas.height * 0.7
        const mainRectY = canvas.height * 0.2
        ctx.fillStyle = 'white'
        ctx.fillRect(rectX, mainRectY, rectWidth, mainRectHeight)
        ctx.strokeStyle = 'black'
        ctx.strokeRect(rectX, mainRectY, rectWidth, mainRectHeight)

        // Set text properties
        const text = 'Jazz In Toronto'
        ctx.font = '50px Arial' // Font size and family
        ctx.fillStyle = 'black' // Text color

        // Calculate the width of the text
        // Calculate the width and height of the text
        const textWidth = ctx.measureText(text).width
        const textHeight = ctx.measureText('M').actualBoundingBoxAscent

        // Calculate the starting position to center the text within the rectangle
        const textX = rectX + (rectWidth - textWidth) / 2
        const textY = titleRectY + (titleRectHeight + textHeight) / 2

        // Draw the text in the center of the rectangle
        ctx.fillText(text, textX, textY)

        ctx.font = '20px Arial'
        let currentY = mainRectY + 20
        let eventTextX = rectX + 5
        this.events.forEach(event => {
            const { band, startDate, venue } = event
            const text = `${band.name} - ${ startDate.toTimeString() } - ${ venue.name }`
            ctx.fillText(text, eventTextX, currentY)
            currentY += 20
        })

        if (process.env.NODE_ENV === 'test') {
            const buffer = canvas.toBuffer('image/png')
            this.savePostLocally(buffer)
        }
    }
}
