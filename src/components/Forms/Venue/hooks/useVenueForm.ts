import { useEffect, useMemo, useRef, useCallback } from 'react'
import { useUploadThing } from '~/hooks/useUploadThing'
import { useForm } from 'react-hook-form'
import { api } from '~/utils/api'
import { MAX_FILE_SIZE } from '~/utils/constants'
import { useToast } from '~/hooks/useToast'
import { setFormValues, trimFileName } from '../../utils'

export interface VenueFormValues {
    name: string
    address: string
    latitude: number
    longitude: number
    city: string
    website: string
    instagramHandle?: string
    fileData?: File
    photoPath?: string
    photoName?: string
    phoneNumber: string
    featured: boolean
    description?: string
}

export default function useVenueForm(id = '', isAdmin: boolean) {
    const { toast } = useToast()
    const deletedFileKeyRef = useRef<string>('')
    const createVenueMutation = api.venue.create.useMutation()
    const editVenueMutation = api.venue.update.useMutation()
    const deleteVenuePhotoMutation = api.venue.deletePhoto.useMutation()
    const getVenueQuery = api.venue.get.useQuery(
        { id },
        {
            enabled: Boolean(id),
            staleTime: Infinity,
            cacheTime: Infinity,
            refetchOnWindowFocus: false,
            refetchOnMount: false
        }
    )

    const hasSubmitted = useMemo(
        () =>
            (editVenueMutation.isSuccess || createVenueMutation.isSuccess) &&
            // Enable admins to submit multiple times
            !isAdmin,
        [editVenueMutation.isSuccess, createVenueMutation.isSuccess, isAdmin]
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
    const { reset, setValue, handleSubmit } = methods

    useEffect(() => {
        const data = getVenueQuery.data
        if (data) {
            deletedFileKeyRef.current = data?.photoPath?.split('/')[4] ?? ''
            reset({
                ...data,
                instagramHandle: data?.instagramHandle ?? '',
                photoPath: data?.photoPath ?? '',
                photoName: data?.photoName ?? '',
                description: data?.description ?? ''
            })
        }
    }, [getVenueQuery.data, reset])

    /**
     * Update form values when image is removed
     */
    const handleRemovePhoto = useCallback(() => {
        setFormValues(
            {
                fileData: undefined,
                photoPath: '',
                photoName: ''
            },
            setValue
        )
    }, [setValue])

    /**
     * Update form values when image is added
     * @param {File[]} files
     */
    const handleAddPhoto = useCallback(
        (files: File[]) => {
            let file = files[0]
            if (file) {
                file = trimFileName(file)
                setFormValues(
                    {
                        fileData: file,
                        photoPath: URL.createObjectURL(file),
                        photoName: file.name
                    },
                    setValue
                )
            }
        },
        [setValue]
    )

    const { startUpload, isUploading } = useUploadThing({
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

    const isLoading = useMemo(
        () =>
            editVenueMutation.isLoading ||
            createVenueMutation.isLoading ||
            getVenueQuery.isFetching ||
            deleteVenuePhotoMutation.isLoading ||
            isUploading,
        [
            editVenueMutation.isLoading,
            createVenueMutation.isLoading,
            getVenueQuery.isFetching,
            deleteVenuePhotoMutation.isLoading,
            isUploading
        ]
    )
    /**
     * Delete photo if necessary
     * @param {VenueFormValues} values
     * @returns {Promise<void>}
     */
    const maybeDeletePhoto = useCallback(
        async (values: VenueFormValues) => {
            // There is a currnet photo attached to the record
            const photoExists = Boolean(getVenueQuery.data?.photoPath)

            // Photo has been changed
            const photoChanged =
                photoExists &&
                values.photoPath !== getVenueQuery.data?.photoPath

            // Photo has been removed
            const photoRemoved =
                !values.photoPath &&
                !values.photoName &&
                !values.fileData &&
                photoExists

            if ((photoRemoved || photoChanged) && photoExists) {
                await deleteVenuePhotoMutation.mutateAsync({
                    id,
                    fileKey: deletedFileKeyRef.current
                })
            }
            deletedFileKeyRef.current = ''
        },
        [deleteVenuePhotoMutation, getVenueQuery.data, id]
    )

    /**
     * Upload photo if necessary
     * @param {VenueFormValues}
     * @returns {Promise<string | undefined>}
     */
    const maybeUploadPhoto = useCallback(
        async (values: VenueFormValues, queryPhotoPath: string) => {
            const isSamePhoto = values.photoPath === queryPhotoPath

            if (values.fileData && !isSamePhoto) {
                if (values.fileData.size > MAX_FILE_SIZE) {
                    return toast({
                        title: 'Error',
                        message:
                            'File size is too large. Please upload a file smaller than 5MB.',
                        type: 'error'
                    })
                }

                const res = await startUpload([values.fileData])

                if (res) {
                    deletedFileKeyRef.current = res[0]?.key ?? ''
                    return res[0]?.url
                } else {
                    throw new Error('Error uploading file')
                }
            }
        },
        [startUpload, toast]
    )

    const onSubmit = async (values: VenueFormValues) => {
        try {
            // Delete photo if necessary
            await maybeDeletePhoto(values)

            // Upload photo if necessary
            const photoPath = await maybeUploadPhoto(
                values,
                getVenueQuery?.data?.photoPath ?? ''
            )

            if (id) {
                await editVenueMutation.mutateAsync({
                    ...values,
                    id,
                    photoPath: photoPath ?? values.photoPath
                })
            } else {
                await createVenueMutation.mutateAsync({
                    ...values,
                    photoPath: photoPath ?? values.photoPath,
                    isApproved: isAdmin
                })
            }

            toast({
                title: 'Success',
                message: 'Venue successfully submitted!'
            })
            await getVenueQuery.refetch()
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
        methods,
        submit,
        isLoading,
        hasSubmitted,
        handleAddPhoto,
        handleRemovePhoto
    }
}
