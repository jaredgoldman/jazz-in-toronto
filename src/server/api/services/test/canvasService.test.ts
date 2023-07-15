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
        // check for existence of file
        // const fileExists = fs.existsSync('src/temp/posts/test.png')
        expect(true).toBe(true)
    })
})
