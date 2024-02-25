import { useState, useCallback } from 'react'
import { api } from '~/utils/api'
import { useForm } from 'react-hook-form'
import { useUploadThing } from '~/hooks/useUploadThing'
import usePostImages from './usePostImages'

interface PostGeneratorValues {
    date: string
    caption: string
}

export default function usePostGenerator() {
    const [error, setError] = useState<string>('')
    const postEventMutation = api.event.post.useMutation()

    const {
        handleSubmit,
        control,
        formState: { errors },
        watch
    } = useForm({
        defaultValues: {
            // Set the date to YYYY-MM-DD
            date: new Date().toISOString().slice(0, 10),
            caption: ''
        }
    })

    const watcheDate = watch('date')

    const { files, isLoading } = usePostImages(watcheDate)

    const { startUpload } = useUploadThing({
        endpoint: 'uploadPosts',
        onUploadError: () => {
            setError('There was an error uploading your image data')
        }
    })

    const onSubmit = useCallback(
        async ({ caption }: PostGeneratorValues) => {
            try {
                if (files?.length) {
                    const res = await startUpload([
                        ...files.map((file) => file)
                    ])
                    res && postEventMutation.mutate({ files: res, caption })
                }
            } catch (error) {
                setError('Oops, there was an error posting')
            }
        },
        [files, startUpload, postEventMutation]
    )

    const submit = handleSubmit(async (data) => {
        await onSubmit(data)
    })

    return {
        control,
        errors,
        submit,
        files,
        error,
        isLoading
    }
}
