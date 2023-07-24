import { describe, it, expect, afterAll } from 'vitest'
import CanvasService from '../canvasService'
import { prisma } from '~/server/db'
import fs from 'fs'
import path from 'path'
import { removeFolderContents } from '~/utils/file'

describe('InstagramService', () => {
    it('should create a post', async () => {
        const numOfEvents = 100
        const events = await prisma.event.findMany({
            take: numOfEvents,
            include: {
                band: true,
                venue: true
            }
        })
        const date = new Date()
        const eventsPerCanvas = 25
        const canvasService = new CanvasService(eventsPerCanvas)
        canvasService.createPosts(events, date)
        const now = new Date(Date.now()).toDateString()
        const shouldExist = numOfEvents / eventsPerCanvas
        // check for existence of files
        for (let i = 1; i <= shouldExist; i++) {
            const fileExists = fs.existsSync(
                `src/temp/posts/jit_ig-${now}-${i}.png`
            )
            expect(fileExists).toBe(true)
        }
    })
})

afterAll(() => {
    const filePath = path.join(__dirname, '../../../../temp/posts/')
    removeFolderContents(filePath)
})
