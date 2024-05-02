import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { api } from '~/utils/api'
import { useUploadThing } from '~/hooks/useUploadThing'
import { MAX_FILE_SIZE } from '~/utils/constants'
import { useToast } from '~/hooks/useToast'
import { setFormValues, trimFileName } from '../../utils'

export interface ArtistFormValues {
    name: string
    genre: string
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
    const fileKeyRef = useRef<string>('')
    const createArtistMutation = api.artist.create.useMutation()
    const editArtistMutation = api.artist.update.useMutation()
    const deleteArtistPhotoMutation = api.artist.deletePhoto.useMutation()
    const getArtistQuery = api.artist.get.useQuery(
        { id },
        {
            enabled: Boolean(id),
            staleTime: Infinity,
            cacheTime: Infinity,
            refetchOnWindowFocus: false
        }
    )

    const hasSubmitted = useMemo(
        () => (createArtistMutation.isSuccess || editArtistMutation.isSuccess) && !isAdmin,
        [createArtistMutation.isSuccess, editArtistMutation.isSuccess]
    )

    const defaultValues: ArtistFormValues = {
        name: '',
        instagramHandle: '',
        genre: '',
        website: '',
        photoPath: '',
        fileData: undefined,
        featured: false,
        description: ''
    }

    const methods = useForm<ArtistFormValues>({
        defaultValues
    })

    useEffect(() => {
        const data = getArtistQuery.data
        if (data) {
            fileKeyRef.current = data?.photoPath?.split('/')[4] ?? ''
            methods.reset({
                ...data,
                instagramHandle: data.instagramHandle ?? '',
                genre: data.genre ?? '',
                photoPath: data.photoPath ?? '',
                photoName: (data?.photoName as string) ?? '',
                website: data.website ?? '',
                description: data.description ?? ''
            })
        }
    }, [getArtistQuery.data, methods.reset])

    /**
     * Perform backend call to delete artist photo on
     * image provider and in db
     */
    const handleDeletePhoto = useCallback(async () => {
        const photoPath = getArtistQuery.data?.photoPath
        if (id && photoPath) {
            await deleteArtistPhotoMutation.mutateAsync({
                id,
                fileKey: fileKeyRef.current
            })
        }
    }, [deleteArtistPhotoMutation, getArtistQuery.data, id])

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
            methods.setValue
        )
    }, [methods])

    /**
     * Update form values when image is added
     * @param {File[]} files
     */
    const handleAddPhoto = useCallback(
        (files: File[]) => {
            console.log('adding image')
            let file = files[0]
            if (file) {
                file = trimFileName(file)
                // console.log({
                //     fileData: file,
                //     photoPath: URL.createObjectURL(file),
                //     photoName: file.name
                // })
                setFormValues(
                    {
                        fileData: file,
                        photoPath: URL.createObjectURL(file),
                        photoName: file.name
                    },
                    methods.setValue
                )
            }
        },
        [methods.setValue]
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
     * Handle form submission
     * @param {ArtistFormValues} values
     */
    const onSubmit = useCallback(
        async (values: ArtistFormValues) => {
            try {
                let photoPath = values.photoPath

                // Photo has been removed
                const photoRemoved =
                    !values.photoPath &&
                    !values.photoName &&
                    !values.fileData &&
                    getArtistQuery.data?.photoPath

                // Photo has been changed
                const photoChanged =
                    values.photoPath !== getArtistQuery.data?.photoPath

                // In either case, we need to delete the photo
                if (photoRemoved || photoChanged) {
                    await handleDeletePhoto()
                }

                // Upload image if it exists
                if (values?.fileData) {
                    if (values?.fileData.size > MAX_FILE_SIZE) {
                        return toast({
                            title: 'Error',
                            message:
                                'File size is too large. Please upload a file smaller than 5MB.',
                            type: 'error'
                        })
                    }

                    console.log('uploading image')
                    const res = await startUpload([values.fileData])

                    if (res) {
                        photoPath = res[0]?.fileUrl
                        fileKeyRef.current = res[0]?.fileKey ?? ''
                    }
                }

                // Do final edit or create mutation
                if (id) {
                    await editArtistMutation.mutateAsync({
                        ...values,
                        id,
                        photoPath
                    })
                } else {
                    await createArtistMutation.mutateAsync({
                        ...values,
                        photoPath,
                        isApproved: isAdmin
                    })
                }

                toast({
                    title: 'Success',
                    message: 'Artist successfully submitted!'
                })
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
            handleDeletePhoto,
            id,
            isAdmin,
            toast,
            getArtistQuery.data,
            startUpload
        ]
    )

    /**
     * react-hook-form submit handler
     * @param {ArtistFormValues} data
     */
    const submit = methods.handleSubmit(async (data) => {
        await onSubmit(data)
    })

    return {
        submit,
        methods,
        isLoading,
        hasSubmitted,
        handleAddPhoto,
        handleRemovePhoto
    }
}
