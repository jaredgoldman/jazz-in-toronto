// Libraries
import fs from 'fs'
import {
    type Canvas,
    createCanvas,
    type CanvasRenderingContext2D
} from 'canvas'
// Types
import { type EventWithBandVenue } from '~/types/data'
// Utils
import { getFormattedTime } from '~/utils/date'
import { daysOfTheWeek } from '~/utils/constants'

export default class CanvasService {
    private ctx: CanvasRenderingContext2D
    private canvas: Canvas
    private canvasWidth: number
    private canvasHeight: number
    private eventsPerCanvas: number

    constructor(eventsPerCanvas = 19, width = 1080, height = 1080) {
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

    public createPosts(
        events: EventWithBandVenue[],
        date: Date
    ): string[] | void {
        const fileUrls = []
        if (events.length > this.eventsPerCanvas) {
            let canvasNumber = 1

            while (events.length) {
                const splicedEvents = events.splice(0, this.eventsPerCanvas)
                const fileUrl = this.createPost(
                    splicedEvents,
                    date,
                    canvasNumber
                )
                fileUrls.push(fileUrl)
                canvasNumber++
            }
        } else {
            const fileUrl = this.createPost(events, date)
            fileUrls.push(fileUrl)
        }
        if (fileUrls.length) {
            return fileUrls
        }
    }

    private createPost(
        events: EventWithBandVenue[],
        date: Date,
        i = 1
    ): string {
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
            const day = daysOfTheWeek[date.getDay() - 1] as string
            console.log('DAY', day)
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
        const eventTextX = rectX + 5

        events.forEach((event) => {
            const { band, startDate, venue } = event
            const text = `${band.name} at ${venue.name} - ${getFormattedTime(
                startDate
            )}`
            this.ctx.fillText(text, eventTextX, currentY)
            currentY += postFontHeight
        })

        // draw tags and brand in bottom of frame
        const tagY = this.canvasHeight - fontHeight + 15
        const tagX = 10
        this.ctx.fillText('@JAZZINTORONTO', tagX, tagY)

        const siteText = 'www.jazzintoronto.com'
        const siteTextWidth = this.ctx.measureText(siteText).width
        const siteX = this.canvasWidth - 10 - siteTextWidth
        this.ctx.fillText('www.jazzintoronto.com', siteX, tagY)

        const buffer = this.canvas.toBuffer('image/png')
        return this.savePostLocally(buffer, i, date) // what's the best way to "return" the canvas for upload?
    }

    private savePostLocally(
        canvasBuffer: Buffer,
        postNum: number,
        date: Date
    ): string {
        const filePath = `src/temp/posts/jit_ig-${date.toDateString()}-${postNum}.png`
        fs.writeFileSync(filePath, canvasBuffer)
        return filePath
    }
}
