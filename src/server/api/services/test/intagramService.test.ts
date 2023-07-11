import { describe, it, expect } from 'vitest'
import InstagramService from '../instagramService'
import { prisma } from '~/server/db'
import fs from 'fs'

describe('InstagramService', () => {
    it('should create a post', async () => {
        const events = await prisma.event.findMany({
            take: 19,
            include: {
                band: true,
                venue: true
            }
        })
        const instagramService = new InstagramService(events)
        await instagramService.createPost()
        // check for existence of file
        const fileExists = fs.existsSync('src/temp/posts/test.png')
        console.log(fileExists)
        expect(fileExists).toBe(true)
    })
})
