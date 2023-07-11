import { createCanvas } from 'canvas'
import fs from 'fs'

export default class InstagramService {
    constructor() {}
    public async createPost() {
        await this.drawImage()
    }

    public async savePostLocally(canvasBuffer: Buffer) {
        console.log("Saving post locally")
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

        // Make title rect
        const titleRectWidth = canvas.width - canvas.width * 0.10
        const titleRectHeight = canvas.height * 0.1
        const titleRectX = canvas.width * 0.05
        const titleRectY = canvas.height * 0.05

        console.log({
            titleRectWidth,
            titleRectHeight,
            titleRectX,
            titleRectY
        })

        ctx.fillStyle = 'white'
        ctx.fillRect(titleRectX, titleRectY, titleRectWidth, titleRectHeight)
        ctx.strokeStyle = 'black'
        ctx.strokeRect(titleRectX, titleRectY, titleRectWidth, titleRectHeight)

        // draw main rect
        const mainRectHeight = canvas.height * 0.7
        const mainRectY = canvas.height * 0.20
        ctx.fillStyle = 'white'
        ctx.fillRect(titleRectX, mainRectY, titleRectWidth, mainRectHeight)
        ctx.strokeStyle = 'black'
        ctx.strokeRect(titleRectX, mainRectY, titleRectWidth, mainRectHeight)

        if (process.env.NODE_ENV === 'test')  {
            const buffer = canvas.toBuffer('image/png')
            this.savePostLocally(buffer)
        }
    }
}
