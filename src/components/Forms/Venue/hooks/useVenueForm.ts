import { useState } from 'react'
import { useUploadThing } from '~/hooks/useUploadThing'
import { api } from '~/utils/api'
import { type Venue } from '~/types/data'
import { type FormikHelpers } from 'formik'
import { env } from '~/env.mjs'

export interface Values {
    name: string
    address: string
    latitude: number
    longitude: number
    city: string
    website: string
    instagramHandle?: string
    photoPath?: string
    fileData?: {
        file: File
        dataURL: string
    }
}

interface Errors {
    name?: string
    location?: string
}

export default function useVenueForm(
    currentValues: Venue | undefined,
    closeModal?: () => void,
    onAdd?: (venue: Venue) => Promise<void>
) {
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

    const onSubmit = async (values: Values, actions: FormikHelpers<Values>) => {
        try {
            setError('')
            let newValues = values
            let addedVenue
            // if we have fileData in form Input
            // upload it first
            //
            if (values?.fileData?.file) {
                // First ensure file is not too large
                if (values.fileData.file.size > env.NEXT_PUBLIC_MAX_FILE_SIZE) {
                    setError(
                        'File size is too large. Please upload a file smaller than 5MB.'
                    )
                    actions.setSubmitting(false)
                    return
                }
                const res = await startUpload([values.fileData.file])
                if (res) {
                    newValues = {
                        ...values,
                        photoPath: res[0]?.fileUrl
                    }
                }
            }
            if (isEditing && currentValues) {
                addedVenue = await editVenueMutation.mutateAsync({
                    id: currentValues?.id,
                    ...newValues
                })
            } else {
                addedVenue = await venueMutation.mutateAsync(newValues)
            }
            // If we're in a modal form, handle accordingly
            onAdd && (await onAdd(addedVenue))
            closeModal && closeModal()
        } catch (e) {
            actions.setSubmitting(false)
            setError('There was an error adding your band. Please try again.')
        }
    }

    const validate = (values: Values) => {
        const errors: Errors = {}
        if (!values.name) {
            errors.name = 'Required'
        }
        if (!values.latitude || !values.longitude || !values.city) {
            errors.location = 'Please enter a valid location'
        }
        return errors
    }

    return {
        initialValues,
        isEditing,
        venueMutation,
        editVenueMutation,
        handleDeletePhoto,
        startUpload,
        setError,
        error,
        onSubmit,
        validate
    }
}
