import { generateComponents } from '@uploadthing/react'

import type { OurFileRouter } from '~/server/uploadthing'

export const { UploadDropzone } = generateComponents<OurFileRouter>()
