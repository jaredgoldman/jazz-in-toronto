import { getServerSession } from 'next-auth'
import { createUploadthing } from 'uploadthing/next-legacy'
import type { FileRouter } from 'uploadthing/next-legacy'
import { authOptions } from './auth'

const f = createUploadthing()

export const uploadRouter = {
    uploadPosts: f({ image: { maxFileSize: '2MB', maxFileCount: 8 } })
        .middleware(async ({ req, res }) => {
            const auth = await getServerSession(req, res, authOptions)

            if (!auth) {
                throw new Error('Not authenticated')
            }

            return {
                userEmail: auth?.user?.email,
                otherProperty: 'hello' as const
            }
        })
        .onUploadComplete(({ metadata, file }) => {
            console.log('uploaded with the following metadata:', metadata)
            metadata
            console.log('files successfully uploaded:', file)
            file
        })
} satisfies FileRouter

export type OurFileRouter = typeof uploadRouter
