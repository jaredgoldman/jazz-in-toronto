import { useEffect, useMemo } from 'react'
import { useUploadThing } from '~/hooks/useUploadThing'
import { useForm } from 'react-hook-form'
import { api } from '~/utils/api'
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
    photoName?: string
    phoneNumber: string
    featured: boolean
    description?: string
}

export default function useVenueForm(id = '') {
    const { toast } = useToast()
    const createVenueMutation = api.venue.create.useMutation()
    const editVenueMutation = api.venue.update.useMutation()
    const deleteVenuePhotoMutation = api.venue.deletePhoto.useMutation()
    const getVenueQuery = api.venue.get.useQuery(
        { id },
        { enabled: Boolean(id), staleTime: Infinity, cacheTime: Infinity }
    )

    const isLoading = useMemo(
        () =>
            editVenueMutation.isLoading ||
            createVenueMutation.isLoading ||
            getVenueQuery.isFetching ||
            deleteVenuePhotoMutation.isLoading,
        [
            editVenueMutation.isLoading,
            createVenueMutation.isLoading,
            getVenueQuery.isFetching,
            deleteVenuePhotoMutation.isLoading
        ]
    )

    const defaultValues: VenueFormValues = {
        name: '',
        photoPath: '',
        photoName: '',
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

    const methods = useForm<VenueFormValues>({
        defaultValues
    })

    useEffect(() => {
        const data = getVenueQuery.data
        if (getVenueQuery.data) {
            methods.reset({
                ...data,
                instagramHandle: data?.instagramHandle ?? '',
                photoPath: data?.photoPath ?? '',
                photoName: (data?.photoName as string) ?? '',
                description: data?.description ?? ''
            })
        }
    }, [getVenueQuery.data, methods])

    const onSelectLocation = (
        address: string,
        latitude: number,
        longitude: number,
        city: string
    ) => {
        methods.setValue('address', address)
        methods.setValue('latitude', latitude)
        methods.setValue('longitude', longitude)
        methods.setValue('city', city)
    }

    const handleDeletePhoto = async () => {
        const currentValues = methods.getValues()
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
        try {
            let photoPath = values.photoPath

            // Photo has been removed
            const photoRemoved =
                !values.photoPath &&
                !values.photoName &&
                !values.fileData &&
                getVenueQuery.data?.photoPath

            // Photo has been changed
            const photoChanged =
                values.photoPath !== getVenueQuery.data?.photoPath

            // In either case, we need to delete the photo
            if (photoRemoved || photoChanged) {
                await handleDeletePhoto()
            }

            // Upload image if it exists
            if (values?.fileData?.file) {
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
                    photoPath = res[0]?.fileUrl
                }
            }

            // Do final edit or create mutation
            if (id) {
                await editVenueMutation.mutateAsync({
                    ...values,
                    id,
                    photoPath
                })
            } else {
                await createVenueMutation.mutateAsync({
                    ...values,
                    photoPath
                })
            }

            await getVenueQuery.refetch()

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

    const submit = methods.handleSubmit(async (data) => await onSubmit(data))

    return {
        handleDeletePhoto,
        startUpload,
        onSelectLocation,
        submit,
        methods,
        isLoading
    }
}
