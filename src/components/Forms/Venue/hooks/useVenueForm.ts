import { useUploadThing } from '~/hooks/useUploadThing'
import { useForm } from 'react-hook-form'
import { api } from '~/utils/api'
import { Venue } from '~/types/data'
import { FileData } from '~/types/data'
import { MAX_FILE_SIZE } from '~/utils/constants'
import { useToast } from '~/hooks/useToast'

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
    description?: string
}

export default function useVenueForm(
    id: string | undefined,
    onAdd?: (data: Venue) => Promise<void>
) {
    const { toast } = useToast()
    const { mutateAsync: venueMutation } = api.venue.create.useMutation()
    const { mutateAsync: editVenueMutation } = api.venue.update.useMutation()
    const deleteVenuePhotoMutation = api.venue.deletePhoto.useMutation()

    const defaultValues: VenueFormValues = {
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
        featured: false,
        description: ''
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
        const currentValues = getValues()
        if (currentValues?.photoPath && id) {
            try {
                await deleteVenuePhotoMutation.mutateAsync({
                    id
                })
                toast({
                    title: 'Success',
                    message: 'Your photo was deleted successfully.'
                })
            } catch {
                toast({
                    title: 'Error',
                    message:
                        'There was an error deleting your photo. Please try again.',
                    type: 'error'
                })
            }
        }
    }

    const { startUpload } = useUploadThing({
        endpoint: 'uploadImage',
        onUploadError: () => {
            toast({
                title: 'Error',
                message:
                    'There was an error uploading your data. Please try again.',
                type: 'error'
            })
        }
    })

    const onSubmit = async (values: VenueFormValues) => {
        console.log({
            values
        })
        try {
            // Make coapy of values and convert phoneNumber to string
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
                    return toast({
                        title: 'Error',
                        message:
                            'File size is too large. Please upload a file smaller than 5MB.',
                        type: 'error'
                    })
                }
                const res = await startUpload([values.fileData.file])
                if (res) {
                    console.log({
                        res
                    })
                    newValues = {
                        ...values,
                        photoPath: res[0]?.fileUrl
                    }
                }
            }
            if (id) {
                addedVenue = await editVenueMutation({
                    id,
                    ...newValues
                })
            } else {
                addedVenue = await venueMutation(newValues)
            }
            // If we're in a modal form, handle accordingly
            onAdd && (await onAdd(addedVenue))
            toast({
                title: 'Success',
                message: 'Venue successfully submitted!'
            })
        } catch (e) {
            toast({
                title: 'Error',
                message: 'There was an error submitting. Please try again',
                type: 'error'
            })
        }
    }

    const submit = handleSubmit(async (data) => await onSubmit(data))

    return {
        handleDeletePhoto,
        startUpload,
        errors,
        control,
        submit,
        onUpload,
        onSelectLocation,
        reset,
        getValues
    }
}
