import { useRef, useEffect, useState, useCallback, type RefObject } from 'react'
import { type EventWithBandVenue } from '~/types/data'
import { daysOfTheWeek } from '~/utils/constants'
import getDay from 'date-fns/getDay'
import { getFormattedTime } from '~/utils/date'

interface Props {
    date?: Date
    events?: EventWithBandVenue[]
    index?: number
    height: number
    width: number
}

interface FileData {
    file: File
    src: string
}
// Returns and canvas element for the outer element to render
export default function useCanvas({
    date,
    events,
    index,
    height = 1080,
    width = 1080
}: Props): {
    fileData: FileData | null
    canvasRef: RefObject<HTMLCanvasElement> | null
} {
    const createPostCanvas = useCallback(
        (
            events: EventWithBandVenue[],
            canvas: HTMLCanvasElement,
            ctx: CanvasRenderingContext2D
        ) => {
            if (canvas) {
                canvas.width = width
                canvas.height = height

                // Set the background color to white
                ctx.fillStyle = '#ffffff'
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
                ctx.fillStyle = 'white'
                ctx.fillRect(rectX, mainRectY, rectWidth, mainRectHeight)
                ctx.strokeStyle = 'black'
                ctx.strokeRect(rectX, mainRectY, rectWidth, mainRectHeight)

                // Draw the date rect
                if (date) {
                    // Set text properties
                    const day = daysOfTheWeek[getDay(date)] as string
                    const formattedDate = new Intl.DateTimeFormat('en-US', {
                        dateStyle: 'long'
                    }).format(date)

                    const dateText = `${day}, ${formattedDate}`
                    ctx.font = '50px Arial' // Font size and family
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

                const fontHeight = 36
                const fontMargin = 2
                const postFontHeight = fontHeight + fontMargin
                ctx.font = `${fontHeight}px Arial`

                let currentY = mainRectY + postFontHeight
                const eventTextX = rectX + 5

                // Print event dates
                events.forEach((event) => {
                    const { band, startDate, venue } = event
                    const text = `${band.name} at ${
                        venue.name
                    } - ${getFormattedTime(startDate)}`
                    ctx.fillText(text, eventTextX, currentY)
                    currentY += postFontHeight
                })

                // draw tags and brand in bottom of frame
                const tagY = height - fontHeight + 15
                const tagX = 10
                ctx.fillText('@JAZZINTORONTO', tagX, tagY)

                const siteText = 'www.jazzintoronto.com'
                const siteTextWidth = ctx.measureText(siteText).width
                const siteX = width - 10 - siteTextWidth
                ctx.fillText('www.jazzintoronto.com', siteX, tagY)
            }
        },
        [date, height, width]
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
                src: dataURL
            }
        }
    }

    const [fileData, setFileData] = useState<FileData | null>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const createCanvas = async () => {
            const canvas = canvasRef.current
            // If not events, return as imgSrc is provided from another source
            if (canvas && events && index) {
                const ctx = canvas.getContext('2d')
                if (ctx) {
                    createPostCanvas(events, canvas, ctx)
                    const fileData = await getBlob(index, canvas)
                    fileData && setFileData(fileData)
                }
            }
        }

        void createCanvas()
    }, [events, index, createPostCanvas])

    return {
        canvasRef,
        fileData
    }
}
