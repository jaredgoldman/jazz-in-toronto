import { useState } from 'react'

import { DANGEROUS__uploadFiles } from 'uploadthing/client'

import { useEvent } from './useEvent'
import useFetch from './useFetch'

type EndpointMetadata = {
    slug: string
    config: any
}[]
const useEndpointMetadata = (endpoint: string) => {
    const { data } = useFetch<EndpointMetadata>('/api/uploadthing')

    // TODO: Log on errors in dev

    return data?.find((x) => x.slug === endpoint)
}

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

    // const permittedFileInfo = useEndpointMetadata(endpoint)

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
