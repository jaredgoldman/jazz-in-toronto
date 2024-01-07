import { getServerSession } from 'next-auth'
import { createUploadthing } from 'uploadthing/next-legacy'
import type { FileRouter } from 'uploadthing/next-legacy'
import { authOptions } from './auth'
import { MAX_FILE_SIZE_READABLE } from '~/utils/constants'

const f = createUploadthing()

export const uploadRouter = {
    uploadPosts: f({
        image: { maxFileSize: MAX_FILE_SIZE_READABLE, maxFileCount: 8 }
    })
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
            console.log({
                metadata,
                file
            })
            return
        }),
    uploadImage: f({
        image: { maxFileSize: MAX_FILE_SIZE_READABLE }
    }).onUploadComplete(({ metadata, file }) => {
        console.log({
            metadata,
            file
        })
        return
    })
} satisfies FileRouter

export type OurFileRouter = typeof uploadRouter
