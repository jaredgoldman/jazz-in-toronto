import { describe, it, expect } from 'vitest'
import InstagramService from '../instagramService'
import { assert } from 'console'
import fs from 'fs'

describe('InstagramService', () => {
    it('should create a post', async () => {
        const instagramService = new InstagramService()
        await instagramService.createPost()
        // check for existence of file
        const fileExists = fs.existsSync('src/temp/posts/test.png')
        console.log(fileExists)
        expect(fileExists).toBe(true)
    })
})
