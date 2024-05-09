import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { api } from '~/utils/api'
import { useUploadThing } from '~/hooks/useUploadThing'
import { MAX_FILE_SIZE } from '~/utils/constants'
import { useToast } from '~/hooks/useToast'
import { setFormValues, trimFileName } from '../../utils'
import { Genre } from '@prisma/client'

export interface ArtistFormValues {
    name: string
    genre?: Genre
    photoPath?: string
    photoName?: string
    instagramHandle?: string
    website?: string
    fileData?: File
    featured: boolean
    description?: string
}

export default function useArtistForm(id = '', isAdmin: boolean) {
    const { toast } = useToast()
    const deletedFileKeyRef = useRef<string>('')
    const createArtistMutation = api.artist.create.useMutation()
    const editArtistMutation = api.artist.update.useMutation()
    const deleteArtistPhotoMutation = api.artist.deletePhoto.useMutation()
    const getArtistQuery = api.artist.get.useQuery(
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
            (createArtistMutation.isSuccess || editArtistMutation.isSuccess) &&
            // Enable admins to submit multiple times
            !isAdmin,
        [createArtistMutation.isSuccess, editArtistMutation.isSuccess, isAdmin]
    )

    const defaultValues: ArtistFormValues = {
        name: '',
        instagramHandle: '',
        genre: undefined,
        website: '',
        photoPath: '',
        fileData: undefined,
        featured: false,
        description: ''
    }

    const {
        reset,
        setValue,
        handleSubmit,
        control,
        watch,
        formState: { errors }
    } = useForm<ArtistFormValues>({
        defaultValues
    })

    useEffect(() => {
        const data = getArtistQuery.data
        if (data) {
            deletedFileKeyRef.current = data?.photoPath?.split('/')[4] ?? ''
            reset({
                ...data,
                instagramHandle: data.instagramHandle ?? '',
                genre: data.genre ?? undefined,
                photoPath: data.photoPath ?? '',
                photoName: (data?.photoName as string) ?? '',
                website: data.website ?? '',
                description: data.description ?? ''
            })
        }
    }, [getArtistQuery.data, reset])

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

    // Handle file uploads and form submission
    const { startUpload, isUploading } = useUploadThing({
        endpoint: 'uploadImage',
        onUploadError: () => {
            toast({
                title: 'Error',
                message: 'There was an error uploading your image data.',
                type: 'error'
            })
        }
    })

    const isLoading = useMemo(() => {
        return (
            editArtistMutation.isLoading ||
            createArtistMutation.isLoading ||
            getArtistQuery.isFetching ||
            deleteArtistPhotoMutation.isLoading ||
            isUploading
        )
    }, [
        editArtistMutation.isLoading,
        createArtistMutation.isLoading,
        getArtistQuery.isFetching,
        deleteArtistPhotoMutation.isLoading,
        isUploading
    ])

    /**
     * Delete photo if necessary
     * @param {ArtistFormValues} values
     * @returns {Promise<void>}
     */
    const maybeDeletePhoto = useCallback(
        async (values: ArtistFormValues) => {
            // There is a currnet photo attached to the record
            const photoExists = Boolean(getArtistQuery.data?.photoPath)

            // Photo has been changed
            const photoChanged =
                photoExists &&
                values.photoPath !== getArtistQuery.data?.photoPath

            // Photo has been removed
            const photoRemoved =
                !values.photoPath &&
                !values.photoName &&
                !values.fileData &&
                photoExists

            if ((photoRemoved || photoChanged) && photoExists) {
                await deleteArtistPhotoMutation.mutateAsync({
                    id,
                    fileKey: deletedFileKeyRef.current
                })
            }
            deletedFileKeyRef.current = ''
        },
        [deleteArtistPhotoMutation, getArtistQuery.data, id]
    )

    /**
     * Upload photo if necessary
     * @param {ArtistFormValues}
     * @returns {Promise<string | undefined>}
     */
    const maybeUploadPhoto = useCallback(
        async (values: ArtistFormValues, queryPhotoPath: string) => {
            const isSamePhoto = values.photoPath === queryPhotoPath

            // Upload image if it exists
            if (values?.fileData && !isSamePhoto) {
                if (values?.fileData.size > MAX_FILE_SIZE) {
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

    /**
     * Handle form submission
     * @param {ArtistFormValues} values
     */
    const onSubmit = useCallback(
        async (values: ArtistFormValues) => {
            try {
                // Delete photo if necessary
                await maybeDeletePhoto(values)

                // Upload photo if necessary
                const photoPath = await maybeUploadPhoto(
                    values,
                    getArtistQuery.data?.photoPath ?? ''
                )

                // Do final edit or create mutation
                if (id) {
                    await editArtistMutation.mutateAsync({
                        ...values,
                        id,
                        photoPath: photoPath ?? values.photoPath
                    })
                } else {
                    await createArtistMutation.mutateAsync({
                        ...values,
                        photoPath: photoPath ?? values.photoPath,
                        isApproved: isAdmin
                    })
                }

                toast({
                    title: 'Success',
                    message: 'Artist successfully submitted!'
                })
                await getArtistQuery.refetch()
            } catch (e) {
                console.error(e)
                toast({
                    title: 'Error',
                    message: 'There was an error submitting. Please try again',
                    type: 'error'
                })
            }
        },
        [
            createArtistMutation,
            editArtistMutation,
            id,
            isAdmin,
            toast,
            getArtistQuery,
            maybeDeletePhoto,
            maybeUploadPhoto
        ]
    )

    /**
     * react-hook-form submit handler
     * @param {ArtistFormValues} data
     */
    const submit = handleSubmit(async (data) => await onSubmit(data))

    return {
        submit,
        watch,
        errors,
        control,
        isLoading,
        hasSubmitted,
        handleAddPhoto,
        handleRemovePhoto
    }
}
