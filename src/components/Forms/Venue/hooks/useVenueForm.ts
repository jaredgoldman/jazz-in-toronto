import { useState } from 'react'
import { useUploadThing } from '~/hooks/useUploadThing'
import { useForm } from 'react-hook-form'
import { api } from '~/utils/api'
import { Venue } from '~/types/data'
import { FileData } from '~/types/data'
import { MAX_FILE_SIZE } from '~/utils/constants'

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
    featured: boolean
}

export default function useVenueForm(
    currentValues?: Venue,
    onAdd?: (data: Venue) => Promise<void>
) {
    // State
    const [error, setError] = useState<string>('')
    // Mutations
    const { mutateAsync: venueMutation, isSuccess: venueMutationIsSuccess } =
        api.venue.create.useMutation()
    const {
        mutateAsync: editVenueMutation,
        isSuccess: editVenueMutationIsSuccess
    } = api.venue.update.useMutation()
    const deleteVenuePhotoMutation = api.venue.deletePhoto.useMutation()

    const isEditing = !!currentValues
    const defaultValues: VenueFormValues = currentValues
        ? {
              name: currentValues.name,
              photoPath: currentValues.photoPath || '',
              latitude: currentValues.latitude || 0,
              longitude: currentValues.longitude || 0,
              city: currentValues.city || '',
              address: currentValues.address || '',
              website: currentValues.website || '',
              instagramHandle: currentValues.instagramHandle || '',
              phoneNumber: currentValues.phoneNumber || '',
              featured: currentValues.featured || false
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
              featured: false
          }

    const {
        handleSubmit,
        setValue,
        control,
        getValues,
        reset,
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
                if (values.fileData.file.size > MAX_FILE_SIZE) {
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
                addedVenue = await editVenueMutation({
                    id: currentValues?.id,
                    ...newValues
                })
            } else {
                addedVenue = await venueMutation(newValues)
            }
            // If we're in a modal form, handle accordingly
            onAdd && (await onAdd(addedVenue))
        } catch (e) {
            setError('There was an error adding your artist. Please try again.')
        }
    }

    const submit = handleSubmit(async (data) => await onSubmit(data))

    return {
        isEditing,
        venueMutationIsSuccess,
        editVenueMutationIsSuccess,
        handleDeletePhoto,
        startUpload,
        setError,
        error,
        errors,
        control,
        submit,
        onUpload,
        onSelectLocation,
        reset,
        getValues
    }
}
