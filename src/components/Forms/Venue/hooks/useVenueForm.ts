// Libraries
import { useState } from 'react'
// Hooks
import { useUploadThing } from '~/hooks/useUploadThing'
import { useForm } from 'react-hook-form'
// utils
import { api } from '~/utils/api'
// Assets
import { env } from '~/env.mjs'
// Types
import { Area } from '@prisma/client'
import { type Venue } from '~/types/data'
import { type FileData } from '~/types/data'

export interface VenueFormValues {
    name: string
    address: string
    latitude: number
    longitude: number
    city: string
    website: string
    instagramHandle?: string
    fileData?: FileData
    photoPath?: string
    phoneNumber: string
    area: Area
}

export default function useVenueForm(
    currentValues: Venue | undefined,
    onAdd?: (venue: Venue) => Promise<void>
) {
    // State
    const [error, setError] = useState<string>('')
    // Mutations
    const venueMutation = api.venue.create.useMutation()
    const editVenueMutation = api.venue.update.useMutation()
    const deleteVenuePhotoMutation = api.venue.deletePhoto.useMutation()

    const isEditing = !!currentValues
    const defaultValues: VenueFormValues = currentValues
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
              fileData: undefined,
              phoneNumber: '',
              area: Area.DOWNTOWN
          }

    const {
        handleSubmit,
        setValue,
        control,
        formState: { errors }
    } = useForm<VenueFormValues>({
        defaultValues
    })

    const onUpload = (data: FileData) => {
        setValue('photoPath', data.dataURL)
    }

    const onSelectLocation = (
        address: string,
        latitude: number,
        longitude: number,
        city: string
    ) => {
        setValue('address', address)
        setValue('latitude', latitude)
        setValue('longitude', longitude)
        setValue('city', city)
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

    const onSubmit = async (values: VenueFormValues) => {
        console.log('SUBMITTING')
        try {
            setError('')
            // Make coapy of values and conver phoneNumber to string
            let newValues = {
                ...values,
                phoneNumber: values.phoneNumber.toString()
            }
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
        } catch (e) {
            setError('There was an error adding your band. Please try again.')
        }
    }

    const submit = handleSubmit(async (data) => await onSubmit(data))

    return {
        isEditing,
        venueMutation,
        editVenueMutation,
        handleDeletePhoto,
        startUpload,
        setError,
        error,
        errors,
        control,
        submit,
        onUpload,
        onSelectLocation
    }
}
