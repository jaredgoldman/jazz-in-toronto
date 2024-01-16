import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { api } from '~/utils/api'
import { useUploadThing } from '~/hooks/useUploadThing'
import { FileData, Artist } from '~/types/data'
import { env } from '~/env.mjs'

export interface ArtistFormValues {
    name: string
    genre: string | null
    photoPath?: string | null
    instagramHandle?: string | null
    website: string | null
    fileData?: {
        file: File
        dataURL: string
    }
    featured: boolean
}

export default function useArtistForm(
    currentValues?: Artist | undefined,
    onAdd?: (values: Artist) => Promise<void>
) {
    const [error, setError] = useState<string>('')
    const { mutateAsync: artistMutation, isSuccess: artistMutationIsSuccess } =
        api.artist.create.useMutation()
    const {
        mutateAsync: editArtistMutation,
        isSuccess: editArtistMutationIsSuccess
    } = api.artist.update.useMutation()
    const deleteartistPhotoMutation = api.artist.deletePhoto.useMutation()

    const isEditing = !!currentValues
    const defaultValues: ArtistFormValues = currentValues
        ? {
              ...currentValues,
              name: currentValues.name,
              instagramHandle: currentValues.instagramHandle || '',
              genre: currentValues.genre || '',
              website: currentValues.website || '',
              photoPath: currentValues.photoPath || ''
          }
        : {
              name: '',
              instagramHandle: '',
              genre: '',
              website: '',
              photoPath: '',
              fileData: undefined,
              featured: false
          }

    console.log(currentValues)

    const {
        handleSubmit,
        control,
        watch,
        setValue,
        getValues,
        reset,
        formState: { errors }
    } = useForm<ArtistFormValues>({
        defaultValues
    })

    const handleDeletePhoto = async () => {
        if (currentValues?.photoPath) {
            try {
                await deleteartistPhotoMutation.mutateAsync({
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

    const onSubmit = async (values: ArtistFormValues) => {
        try {
            setError('')
            let newValues = values
            let addedArtist: Artist
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
                addedArtist = await editArtistMutation({
                    id: currentValues?.id,
                    ...newValues
                })
            } else {
                addedArtist = await artistMutation(newValues)
            }
            // XXX: simplify this process, we shouldn't have to prop drill like this
            // maybe pull the modal context into this form?
            onAdd && (await onAdd(addedArtist))
        } catch (e) {
            setError('There was an error adding your artist. Please try again.')
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
        artistMutationIsSuccess,
        editArtistMutationIsSuccess,
        handleDeletePhoto,
        startUpload,
        error,
        setError,
        submit,
        errors,
        control,
        watch,
        onUpload,
        getValues,
        reset
    }
}
