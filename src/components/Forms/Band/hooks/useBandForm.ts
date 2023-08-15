import { useState } from 'react'
import { api } from '~/utils/api'
import { useUploadThing } from '~/hooks/useUploadThing'
import { type FileData, type Band } from '~/types/data'
import { env } from '~/env.mjs'
import { useForm } from 'react-hook-form'

export interface BandFormValues {
    name: string
    genre?: string
    photoPath?: string
    instagramHandle: string | undefined
    website?: string
    fileData?: {
        file: File
        dataURL: string
    }
}

export default function useBandForm(
    currentValues: Band | undefined,
    onAdd?: (values: Band) => Promise<void>
) {
    // State
    const [error, setError] = useState<string>('')
    // Mutations
    const bandMutation = api.band.create.useMutation()
    const editBandMutation = api.band.update.useMutation()
    const deleteBandPhotoMutation = api.band.deletePhoto.useMutation()

    const isEditing = !!currentValues
    const defaultValues: BandFormValues = currentValues
        ? {
              name: currentValues.name,
              instagramHandle: currentValues.instagramHandle || undefined,
              genre: currentValues.genre || undefined,
              website: currentValues.website || undefined,
              photoPath: currentValues.photoPath || undefined
          }
        : {
              name: '',
              instagramHandle: '',
              genre: '',
              website: '',
              photoPath: '',
              fileData: undefined
          }

    const {
        handleSubmit,
        control,
        watch,
        setValue,
        formState: { errors }
    } = useForm<BandFormValues>({
        defaultValues
    })

    const handleDeletePhoto = async () => {
        if (currentValues?.photoPath) {
            try {
                await deleteBandPhotoMutation.mutateAsync({
                    id: currentValues.id
                })
            } catch {
                setError(
                    'There was an error deleting your photo. Please try again.'
                )
            }
        }
    }

    // Handle file uploads and form submission
    const { startUpload } = useUploadThing({
        endpoint: 'uploadImage',
        onUploadError: () => {
            setError('There was an error uploading your image data')
        }
    })

    const onSubmit = async (values: BandFormValues) => {
        try {
            setError('')
            let newValues = values
            let addedBand
            // if we have fileData in form Input
            // upload it first
            if (values?.fileData?.file) {
                // First ensure file is not too large
                if (values.fileData.file.size > env.NEXT_PUBLIC_MAX_FILE_SIZE) {
                    setError(
                        'File size is too large. Please upload a file smaller than 5MB.'
                    )
                    return
                }
                const res = await startUpload([values.fileData.file])
                // Strip fileDate from the mutation data
                delete values.fileData
                if (res) {
                    newValues = {
                        ...values,
                        photoPath: res[0]?.fileUrl
                    }
                }
            }
            if (isEditing && currentValues) {
                addedBand = await editBandMutation.mutateAsync({
                    id: currentValues?.id,
                    ...newValues
                })
            } else {
                addedBand = await bandMutation.mutateAsync(newValues)
            }
            // XXX: simplify this process, we shouldn't have to prop drill like this
            // maybe pull the modal context into this form?
            onAdd && (await onAdd(addedBand))
        } catch (e) {
            setError('There was an error adding your band. Please try again.')
        }
    }

    const onUpload = (data: FileData) => {
        setValue('photoPath', data.dataURL)
    }

    const submit = handleSubmit(async (data) => {
        await onSubmit(data)
    })

    return {
        isEditing,
        bandMutation,
        editBandMutation,
        handleDeletePhoto,
        startUpload,
        error,
        setError,
        submit,
        errors,
        control,
        watch,
        onUpload
    }
}
