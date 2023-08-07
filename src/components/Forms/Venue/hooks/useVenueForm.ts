import { useState } from 'react'
import { useUploadThing } from '~/hooks/useUploadThing'
import { api } from '~/utils/api'
import { type Venue } from '~/types/data'
import { type Values } from '../index'

export default function useVenueForm(currentValues: Venue | undefined) {
    // State
    const [error, setError] = useState<string>('')
    // Mutations
    const venueMutation = api.venue.create.useMutation()
    const editVenueMutation = api.venue.update.useMutation()
    const deleteVenuePhotoMutation = api.venue.deletePhoto.useMutation()

    const isEditing = !!currentValues
    const initialValues: Values = currentValues
        ? {
              ...currentValues,
              photoPath: currentValues.photoPath || undefined,
              instagramHandle: currentValues.instagramHandle || undefined
          }
        : {
              name: '',
              photoPath: '',
              latitude: 0,
              longitude: 0,
              city: '',
              address: '',
              instagramHandle: '',
              website: '',
              fileData: undefined
          }

    const handleDeletePhoto = async () => {
        if (currentValues?.photoPath) {
            try {
                await deleteVenuePhotoMutation.mutateAsync({
                    id: currentValues.id
                })
            } catch {
                setError(
                    'There was an error deleting your photo. Please try again.'
                )
            }
        }
    }

    const { startUpload } = useUploadThing({
        endpoint: 'uploadImage',
        onUploadError: () => {
            setError(
                'There was an error uploading your data. Please try again.'
            )
        }
    })

    return {
        initialValues,
        isEditing,
        venueMutation,
        editVenueMutation,
        handleDeletePhoto,
        startUpload,
        setError,
        error
    }
}
