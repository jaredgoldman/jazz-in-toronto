import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { api } from '~/utils/api'
import { useUploadThing } from '~/hooks/useUploadThing'
import { MAX_FILE_SIZE } from '~/utils/constants'
import { useToast } from '~/hooks/useToast'
import { FileData } from '~/types/data'

export interface ArtistFormValues {
    name: string
    genre: string
    photoPath?: string
    photoName?: string
    instagramHandle?: string
    website?: string
    fileData?: FileData
    featured: boolean
    description?: string
}

export default function useArtistForm(id = '') {
    const { toast } = useToast()
    const createArtistMutation = api.artist.create.useMutation()
    const editArtistMutation = api.artist.update.useMutation()
    const deleteartistPhotoMutation = api.artist.deletePhoto.useMutation()
    const getArtistQuery = api.artist.get.useQuery(
        { id },
        { enabled: Boolean(id), staleTime: Infinity, cacheTime: Infinity }
    )

    const isLoading = useMemo(() => {
        return (
            editArtistMutation.isLoading ||
            createArtistMutation.isLoading ||
            getArtistQuery.isFetching ||
            deleteartistPhotoMutation.isLoading
        )
    }, [
        editArtistMutation.isLoading,
        createArtistMutation.isLoading,
        getArtistQuery.isFetching,
        deleteartistPhotoMutation.isLoading
    ])

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
    }, [getArtistQuery.data, methods])

    const handleDeletePhoto = async () => {
        if (id) {
            try {
                await deleteartistPhotoMutation.mutateAsync({
                    id
                })
            } catch {
                toast({
                    title: 'Error',
                    message: 'There was an error deleting your photo.',
                    type: 'error'
                })
            }
        }
    }

    // Handle file uploads and form submission
    const { startUpload } = useUploadThing({
        endpoint: 'uploadImage',
        onUploadError: () => {
            toast({
                title: 'Error',
                message: 'There was an error uploading your image data.',
                type: 'error'
            })
        }
    })

    const onSubmit = async (values: ArtistFormValues) => {
        console.log({
            values
        })
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
                await editArtistMutation.mutateAsync({
                    ...values,
                    id,
                    photoPath
                })
            } else {
                await createArtistMutation.mutateAsync({
                    ...values,
                    photoPath
                })
            }

            await useGetArtistQuery.refetch()

            toast({
                title: 'Success',
                message: 'Artist successfully submitted!'
            })
        } catch (e) {
            toast({
                title: 'Error',
                message: 'There was an error submitting. Please try again',
                type: 'error'
            })
        }
    }

    const submit = methods.handleSubmit(async (data) => {
        await onSubmit(data)
    })

    return {
        submit,
        methods,
        isLoading
    }
}
