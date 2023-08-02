import { useRef, createRef, useEffect, RefObject } from 'react'
import { type EventWithBandVenue } from '~/types/data'
import { getFormattedTime } from '~/utils/date'
import { daysOfTheWeek } from '~/utils/constants'
import getDay from 'date-fns/getDay'

export default function useCreatePost(
    events: EventWithBandVenue[] | undefined,
    date: Date,
    eventsPerCanvas = 19
) {
    // Create refs for each canvas needed
    const refArray = useRef<any[]>([])
    const eventsCopy = events ? [...events] : []
    const refsNeeded = events ? Math.ceil(events.length / eventsPerCanvas) : 1
    // const refArray = Array.from({ length: refsNeeded }, () => {
    //     return {
    //         ref: createRef<HTMLCanvasElement>(),
    //         events: eventsCopy.splice(0, eventsPerCanvas)
    //     }
    // })

    useEffect(() => {
        // if (refArray.current.length >= refsNeeded) return
        // when the component mounts, create the refs
        refArray.current = Array.from({ length: refsNeeded }, () => {
            return {
                ref: createRef<HTMLCanvasElement>(),
                events: eventsCopy.splice(0, eventsPerCanvas)
            }
        })
    }, [events])

    const createPostCanvas = (
        events: EventWithBandVenue[],
        date: Date,
        ref: RefObject<HTMLCanvasElement>,
        height = 1080,
        width = 1080
    ) => {
        const canvas = ref.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (canvas && ctx) {
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
                const textHeight = ctx.measureText('M').actualBoundingBoxAscent

                // Calculate the starting position to center the text within the rectangle
                const textX = rectX + (rectWidth - textWidth) / 2
                const textY = titleRectY + (titleRectHeight + textHeight) / 2

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
    }
    // // take refs and
    // // 1. create canvases
    // // 2. get blob and make file object
    useEffect(() => {
        const postData = refArray.current.map(
            async ({ ref, events }, index) => {
                if (ref) {
                    createPostCanvas(events, date, ref, 1080, 1080)
                    console.log(ref.current)
                    if (!ref.current) return
                    const dataURL = ref.current.toDataURL('image/png')
                    const blob = await (await fetch(dataURL)).blob()
                    const file = new File([blob], `ig_post-${index + 1}.png`, {
                        type: 'image/png'
                    })
                    console.log({
                        file,
                        dataURL
                    })
                    return {
                        file,
                        src: dataURL
                    }
                }
            }
        )
    }, [refArray.current])
}
