// Libraries
import { useState } from 'react'
import { DANGEROUS__uploadFiles } from 'uploadthing/client'
import { useEvent } from './useEvent'

export const useUploadThing = <T extends string>({
    endpoint,
    onClientUploadComplete,
    onUploadError
}: {
    endpoint: T
    onClientUploadComplete?: (
        res?: Awaited<ReturnType<typeof DANGEROUS__uploadFiles>>
    ) => void
    onUploadError?: (e: Error) => void
}) => {
    const [isUploading, setUploading] = useState(false)

    const startUpload = useEvent(async (files: File[]) => {
        setUploading(true)
        try {
            const res = await DANGEROUS__uploadFiles({ files, endpoint })
            setUploading(false)
            onClientUploadComplete?.(res)
            return res
        } catch (e) {
            setUploading(false)
            onUploadError?.(e as Error)
            return
        }
    })
    return {
        startUpload,
        isUploading
        // permittedFileInfo
    } as const
}

export type FullFile = {
    file: File
    contents: string
}
