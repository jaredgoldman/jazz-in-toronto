import { useState } from 'react'
import { api } from '~/utils/api'
import { useUploadThing } from '~/hooks/useUploadThing'
import { type Band } from '~/types/data'
import { type Values } from '../index'

export default function useBandForm(currentValues: Band | undefined) {
    // State
    const [error, setError] = useState<string>('')
    // Mutations
    const bandMutation = api.band.create.useMutation()
    const editBandMutation = api.band.update.useMutation()
    const deleteBandPhotoMutation = api.band.deletePhoto.useMutation()

    const isEditing = !!currentValues
    const initialValues: Values = currentValues
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
            setError(
                'There was an error uploading your image data. Is your file too large?'
            )
        }
    })

    return {
        initialValues,
        isEditing,
        bandMutation,
        editBandMutation,
        handleDeletePhoto,
        startUpload,
        error,
        setError
    }
}
