import { useCallback } from 'react'
import getDay from 'date-fns/getDay'
import { getDaysOfTheWeek } from '~/utils/constants'
import { EventWithArtistVenue } from '~/types/data'
import { getDateEST, getFormattedTime } from '~/utils/date'

/**
 * Custom hook to create a canvas for rendering event posters.
 *
 * @returns {Function} A function that generates a canvas with event information.
 */
export default function useCanvas() {
    // re-use the cnavas element
    const canvas = document.createElement('canvas')

    // Define canvas size
    const width = 1080
    const height = 1080

    // Define background color
    const bgColor = '#DC84AC'

    // Set the canvas size
    canvas.width = width
    canvas.height = height

    // Set border positions
    const rectWidth = width - width * 0.1
    const rectX = width * 0.05

    // Set title rect positions
    const titleRectHeight = height * 0.1
    const titleRectY = height * 0.05

    // Set listings rect positions
    const mainRectHeight = height * 0.7
    const mainRectY = height * 0.2

    /**
     * Draw the background of the canvas
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context for the canvas.
     */
    const drawBg = useCallback((ctx: CanvasRenderingContext2D) => {
        ctx.fillStyle = bgColor
        ctx.fillRect(0, 0, width, height)
    }, [])

    /**
     * Draw the borders of the title and main area
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context for the canvas.
     */
    const drawBorders = useCallback(
        (ctx: CanvasRenderingContext2D) => {
            // draw title rect
            ctx.fillStyle = 'white'
            ctx.fillRect(rectX, titleRectY, rectWidth, titleRectHeight)
            ctx.strokeStyle = 'black'
            ctx.strokeRect(rectX, titleRectY, rectWidth, titleRectHeight)

            // draw main rect
            ctx.fillStyle = bgColor
            ctx.fillRect(rectX, mainRectY, rectWidth, mainRectHeight)
            ctx.strokeStyle = 'black'
            ctx.strokeRect(rectX, mainRectY, rectWidth, mainRectHeight)
        },
        [
            mainRectY,
            rectWidth,
            rectX,
            titleRectHeight,
            titleRectY,
            mainRectHeight
        ]
    )

    /**
     * Draw the date of the event in the title rectangle
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context for the canvas.
     * @param {Date} date - The date of the event.
     */
    const drawPostDate = useCallback(
        (ctx: CanvasRenderingContext2D, date: Date) => {
            const dateEST = getDateEST(date)

            // Set text properties
            const day = getDaysOfTheWeek('long')[getDay(dateEST)] as string
            const formattedDate = new Intl.DateTimeFormat('en-US', {
                day: '2-digit',
                month: 'long'
            }).format(dateEST)

            const dateText = `${day}, ${formattedDate}`.toUpperCase()
            ctx.font = '600 60px poppins' // Font size and family
            ctx.fillStyle = 'black' // Text color

            // Calculate the width and height of the text
            const textWidth = ctx.measureText(dateText).width
            const textHeight = ctx.measureText('M').actualBoundingBoxAscent

            // Calculate the starting position to center the text within the rectangle
            const textX = rectX + (rectWidth - textWidth) / 2
            const textY = titleRectY + (titleRectHeight + textHeight) / 2

            // Draw the text in the center of the rectangle
            ctx.fillText(dateText, textX, textY)
        },
        [rectWidth, rectX, titleRectHeight, titleRectY]
    )

    /**
     * Draw the event details in the main rectangle
     * @param {CanvasRenderingContext2D}
     * @param {EventWithArtistVenue[]} events - An array of event objects with artist and venue information.
     */
    const drawEvents = useCallback(
        (ctx: CanvasRenderingContext2D, events: EventWithArtistVenue[]) => {
            const fontHeight = 30
            const fontMargin = 5
            const postFontHeight = fontHeight + fontMargin
            ctx.font = `200 ${fontHeight}px poppins`

            let currentY = mainRectY + postFontHeight + 10
            const eventTextX = rectX + 20

            // Print event dates
            events.forEach((event) => {
                const { artist, startDate, venue } = event
                const text = `${getFormattedTime(startDate)} - ${
                    artist.name
                } at ${venue.name}`
                ctx.fillText(text, eventTextX, currentY)
                currentY += postFontHeight
            })
        },
        [mainRectY, rectX]
    )

    /**
     * Draw the footer content
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context for the canvas.
     */
    const drawFooterContent = useCallback((ctx: CanvasRenderingContext2D) => {
        const fontHeight = 20
        ctx.font = `800 ${fontHeight}px poppins`
        const tagY = height - fontHeight + 5
        const tagX = 15
        ctx.fillText('@JAZZINTORONTO', tagX, tagY)

        const siteText = 'www.jazzintoronto.com'
        const siteTextWidth = ctx.measureText(siteText).width
        const siteX = width - 15 - siteTextWidth
        ctx.fillText('www.jazzintoronto.com', siteX, tagY)
    }, [])

    /**
     * Creates a canvas for an event post and draws event details onto it.
     *
     * @param {EventWithArtistVenue[]} events - An array of event objects with artist and venue information.
     * @param {HTMLCanvasElement} canvas - The canvas element to draw on.
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context for the canvas.
     * @param {Date} date - The date of the event.
     * @param {number} [width=1080] - The width of the canvas.
     * @param {number} [height=1080] - The height of the canvas.
     * @param {string} [bgColor='#DC84AC'] - The background color of the canvas.
     */
    const drawCanvas = useCallback(
        (
            events: EventWithArtistVenue[],
            ctx: CanvasRenderingContext2D,
            date: Date
        ) => {
            drawBg(ctx)
            drawBorders(ctx)
            drawPostDate(ctx, date)
            drawEvents(ctx, events)
            drawFooterContent(ctx)
        },
        [drawBg, drawBorders, drawEvents, drawFooterContent, drawPostDate]
    )

    /**
     * Convert canvas to file
     * @param {number} currentIndex - The index of the canvas
     * @param {HTMLCanvasElement} canvas - The canvas element to draw on.
     */
    const convertCanvasToFile = useCallback(
        async (
            currentIndex: number,
            canvas: HTMLCanvasElement
        ): Promise<File> => {
            const dataURL = canvas.toDataURL('image/png')
            const blob = await (await fetch(dataURL)).blob()
            const file = new File([blob], `jazzintoronto-${currentIndex}.png`, {
                type: 'image/png'
            })
            return file
        },
        []
    )

    /**
     * Create a canvas for an event post and draw event details onto it.
     * @param {EventWithArtistVenue[]} events - An array of event objects with artist and venue information.
     * @param {number} index - The index of the canvas
     * @param {Date} date - The date of the event.
     * @returns {Promise<File>} A promise that resolves to a file.
     */
    const createCanvas = useCallback(
        async (events: EventWithArtistVenue[], index: number, date: Date) => {
            const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
            drawCanvas(events, ctx, date)
            return await convertCanvasToFile(index, canvas)
        },
        [canvas, drawCanvas, convertCanvasToFile]
    )

    return createCanvas
}
