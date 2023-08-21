// Libraries
import { useCallback } from 'react'
import getDay from 'date-fns/getDay'
import { getDaysOfTheWeek } from '~/utils/constants'
// Types
import { type EventWithArtistVenue } from '~/types/data'
import { type FileData } from '~/types/data'
// utils
import { getFormattedTime } from '~/utils/date'
// Assets
// Returns and canvas element for the outer element to render
export default function useCanvas() {
    const canvas = document.createElement('canvas')

    const createPostCanvas = useCallback(
        async (
            events: EventWithArtistVenue[],
            canvas: HTMLCanvasElement,
            ctx: CanvasRenderingContext2D,
            date: Date,
            width = 1080,
            height = 1080,
            bgColor = '#DC84AC'
        ) => {
            if (canvas) {
                await document.fonts.load('50px poppins')
                canvas.width = width
                canvas.height = height

                // Set the background color to white
                ctx.fillStyle = bgColor
                ctx.fillRect(0, 0, width, height)

                // Global sizes
                const rectWidth = width - width * 0.1
                const rectX = width * 0.05

                // Make title rect
                const titleRectHeight = height * 0.1
                const titleRectY = height * 0.05

                ctx.fillStyle = 'white'
                ctx.fillRect(rectX, titleRectY, rectWidth, titleRectHeight)
                ctx.strokeStyle = 'black'
                ctx.strokeRect(rectX, titleRectY, rectWidth, titleRectHeight)

                // draw main rect
                const mainRectHeight = height * 0.7
                const mainRectY = height * 0.2
                ctx.fillStyle = bgColor
                ctx.fillRect(rectX, mainRectY, rectWidth, mainRectHeight)
                ctx.strokeStyle = 'black'
                ctx.strokeRect(rectX, mainRectY, rectWidth, mainRectHeight)

                // Draw the date rect
                if (date) {
                    // Set text properties
                    const day = getDaysOfTheWeek('long')[getDay(date)] as string
                    const formattedDate = new Intl.DateTimeFormat('en-US', {
                        day: '2-digit',
                        month: 'long'
                    }).format(date)

                    const dateText = `${day}, ${formattedDate}`.toUpperCase()
                    ctx.font = '600 60px poppins' // Font size and family
                    ctx.fillStyle = 'black' // Text color

                    // Calculate the width of the text
                    // Calculate the width and height of the text
                    const textWidth = ctx.measureText(dateText).width
                    const textHeight =
                        ctx.measureText('M').actualBoundingBoxAscent

                    // Calculate the starting position to center the text within the rectangle
                    const textX = rectX + (rectWidth - textWidth) / 2
                    const textY =
                        titleRectY + (titleRectHeight + textHeight) / 2

                    // Draw the text in the center of the rectangle
                    ctx.fillText(dateText, textX, textY)
                }

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

                // draw tags and brand in bottom of frame
                ctx.font = `800 ${fontHeight}px poppins`
                const tagY = height - fontHeight + 5
                const tagX = 15
                ctx.fillText('@JAZZINTORONTO', tagX, tagY)

                const siteText = 'www.jazzintoronto.com'
                const siteTextWidth = ctx.measureText(siteText).width
                const siteX = width - 15 - siteTextWidth
                ctx.fillText('www.jazzintoronto.com', siteX, tagY)
            }
        },
        []
    )

    const getBlob = async (
        currentIndex: number,
        canvas: HTMLCanvasElement
    ): Promise<FileData | undefined> => {
        if (canvas) {
            const dataURL = canvas.toDataURL('image/png')
            const blob = await (await fetch(dataURL)).blob()
            const file = new File([blob], `jazzintoronto-${currentIndex}.png`, {
                type: 'image/png'
            })
            return {
                file,
                dataURL
            }
        }
    }

    const createCanvas = async (
        events: EventWithArtistVenue[],
        index: number,
        date: Date
    ) => {
        // If not events, return as imgSrc is provided from another source
        const ctx = canvas.getContext('2d')
        if (ctx) {
            await createPostCanvas(events, canvas, ctx, date)
            return await getBlob(index, canvas)
        }
    }

    return createCanvas
}
