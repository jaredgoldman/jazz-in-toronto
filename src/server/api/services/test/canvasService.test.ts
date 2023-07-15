import { describe, it, expect } from 'vitest'
import CanvasService from '../canvasService'
import { prisma } from '~/server/db'
import fs from 'fs'

describe('InstagramService', () => {
    it('should create a post', async () => {
        const events = await prisma.event.findMany({
            take: 30,
            include: {
                band: true,
                venue: true
            }
        })
        const date = new Date()
        const canvasService = new CanvasService()
        canvasService.createPosts(events, date)
        // check for existence of files
        const fileExists = fs.existsSync('src/temp/posts/test-1.png')
        const secondFileExists = fs.existsSync('src/temp/posts/test-2.png')
        expect(fileExists).toBe(true)
        expect(secondFileExists).toBe(true)
    })
})
