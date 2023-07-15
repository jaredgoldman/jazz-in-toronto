import fs from 'fs'
import { Canvas, createCanvas, CanvasRenderingContext2D } from 'canvas'
import { EventWithBandVenue } from '~/types/data'
import { getFormattedTime } from '~/utils/date'
import { daysOfTheWeek } from '~/utils/constants'

export default class CanvasService {
    private ctx: CanvasRenderingContext2D
    private canvas: Canvas
    private canvasWidth: number
    private canvasHeight: number
    private eventsPerCanvas: {
        initial: number
        rest: number
    }

    constructor(
        width: number = 1080,
        height: number = 1080,
        eventsPerCanvas = {
            initial: 19,
            rest: 25
        }
    ) {
        const { canvas, ctx } = this.getCanvas(width, height)
        this.canvas = canvas
        this.ctx = ctx
        this.canvasWidth = width
        this.canvasHeight = height
        this.eventsPerCanvas = eventsPerCanvas
    }

    private getCanvas(
        width: number,
        height: number
    ): { canvas: Canvas; ctx: CanvasRenderingContext2D } {
        const canvas = createCanvas(width, height)
        const ctx = canvas.getContext('2d')
        return { canvas, ctx }
    }

    public createPosts(events: EventWithBandVenue[], date: Date) {
        if (events.length > this.eventsPerCanvas.initial) {
            let splicedEvents = events.splice(0, this.eventsPerCanvas.initial)
            this.createPost(splicedEvents, date)
            let canvasNumber = 2
            while (events.length) {
                splicedEvents = events.splice(0, this.eventsPerCanvas.rest)
                this.createPost(splicedEvents, date, canvasNumber)
                canvasNumber++
            }
        } else {
            this.createPost(events, date)
        }
    }

    private createPost(events: EventWithBandVenue[], date?: Date, i = 1) {
        // Set the background color to white
        this.ctx.fillStyle = '#ffffff'
        this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight)

        // Global sizes
        const rectWidth = this.canvasWidth - this.canvasWidth * 0.1
        const rectX = this.canvasWidth * 0.05

        // Make title rect
        const titleRectHeight = this.canvasHeight * 0.1
        const titleRectY = this.canvasHeight * 0.05

        this.ctx.fillStyle = 'white'
        this.ctx.fillRect(rectX, titleRectY, rectWidth, titleRectHeight)
        this.ctx.strokeStyle = 'black'
        this.ctx.strokeRect(rectX, titleRectY, rectWidth, titleRectHeight)

        // draw main rect
        const mainRectHeight = this.canvasHeight * 0.7
        const mainRectY = this.canvasHeight * 0.2
        this.ctx.fillStyle = 'white'
        this.ctx.fillRect(rectX, mainRectY, rectWidth, mainRectHeight)
        this.ctx.strokeStyle = 'black'
        this.ctx.strokeRect(rectX, mainRectY, rectWidth, mainRectHeight)

        // Draw the date rect
        if (date) {
            // Set text properties
            const day = daysOfTheWeek[date.getDay()]
            const formattedDate = new Intl.DateTimeFormat('en-US', {
                dateStyle: 'long'
            }).format(date)

            const dateText = `${day}, ${formattedDate}`
            this.ctx.font = '50px Arial' // Font size and family
            this.ctx.fillStyle = 'black' // Text color

            // Calculate the width of the text
            // Calculate the width and height of the text
            const textWidth = this.ctx.measureText(dateText).width
            const textHeight = this.ctx.measureText('M').actualBoundingBoxAscent

            // Calculate the starting position to center the text within the rectangle
            const textX = rectX + (rectWidth - textWidth) / 2
            const textY = titleRectY + (titleRectHeight + textHeight) / 2

            // Draw the text in the center of the rectangle
            this.ctx.fillText(dateText, textX, textY)
        }

        const fontHeight = 36
        const fontMargin = 2
        const postFontHeight = fontHeight + fontMargin
        this.ctx.font = `${fontHeight}px Arial`

        let currentY = mainRectY + postFontHeight
        let eventTextX = rectX + 5

        events.forEach((event) => {
            const { band, startDate, venue } = event
            const text = `${band.name} at ${venue.name} - ${getFormattedTime(
                startDate
            )}`
            this.ctx.fillText(text, eventTextX, currentY)
            currentY += postFontHeight
        })

        if (process.env.NODE_ENV === 'test') {
            const buffer = this.canvas.toBuffer('image/png')
            this.savePostLocally(buffer, i)
        }
    }

    private async savePostLocally(canvasBuffer: Buffer, postNum: number) {
        const filePath = `src/temp/posts/test.png-${postNum}`
        return fs.writeFileSync(filePath, canvasBuffer)
    }
}
