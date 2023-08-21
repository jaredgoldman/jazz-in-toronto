import { useState } from 'react'
import { api } from '~/utils/api'
import { useForm } from 'react-hook-form'
import { useUploadThing } from '~/hooks/useUploadThing'
import usePostImages from './usePostImages'

interface PostGeneratorValues {
    date: Date
    caption: string
}

export default function usePostGenerator() {
    const [error, setError] = useState<string>('')
    const { isLoading, data, mutate, isSuccess } = api.event.post.useMutation()
    const defaultValues = {
        date: new Date(),
        caption: ''
    }

    const {
        handleSubmit,
        control,
        formState: { errors },
        watch
    } = useForm({ defaultValues })

    const { data: events, refetch } = api.event.getAllByDay.useQuery({
        date: watch('date')
    })

    const { files } = usePostImages(events, watch('date'))

    const { startUpload } = useUploadThing({
        endpoint: 'uploadPosts',
        onUploadError: () => {
            setError('There was an error uploading your image data')
        }
    })

    const onSubmit = async ({ caption }: PostGeneratorValues) => {
        try {
            if (files?.length) {
                const res = await startUpload([
                    ...files.map((file) => file.file)
                ])
                res && mutate({ files: res, caption })
            }
        } catch (error) {
            setError('Oops, there was an error posting')
        }
    }

    const submit = handleSubmit(async (data) => {
        await onSubmit(data)
    })

    return {
        isSuccess,
        isLoading,
        control,
        errors,
        data,
        submit,
        events,
        files,
        error,
        refetch
    }
}
