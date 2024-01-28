import { useForm } from 'react-hook-form'
import { api } from '~/utils/api'
import { useUploadThing } from '~/hooks/useUploadThing'
import { FileData, Artist } from '~/types/data'
import { MAX_FILE_SIZE } from '~/utils/constants'
import { useToast } from '~/hooks/useToast'

export interface ArtistFormValues {
    name: string
    genre: string
    photoPath?: string
    instagramHandle?: string
    website: string
    fileData?: {
        file: File
        dataURL: string
    }
    featured: boolean
}

export default function useArtistForm(
    isEditing?: boolean,
    currentValues?: Artist | undefined,
    onAdd?: (values: Artist) => Promise<void>
) {
    const { toast } = useToast()
    const { mutateAsync: artistMutation } = api.artist.create.useMutation()
    const { mutateAsync: editArtistMutation } = api.artist.update.useMutation()
    const deleteartistPhotoMutation = api.artist.deletePhoto.useMutation()

    const defaultValues: ArtistFormValues = currentValues
        ? {
              ...currentValues,
              name: currentValues.name,
              instagramHandle: currentValues.instagramHandle || '',
              genre: currentValues.genre || '',
              website: currentValues.website || '',
              photoPath: currentValues.photoPath || ''
          }
        : {
              name: '',
              instagramHandle: '',
              genre: '',
              website: '',
              photoPath: '',
              fileData: undefined,
              featured: false
          }

    const {
        handleSubmit,
        control,
        watch,
        setValue,
        getValues,
        reset,
        formState: { errors }
    } = useForm<ArtistFormValues>({
        defaultValues
    })

    const handleDeletePhoto = async () => {
        if (currentValues?.photoPath) {
            try {
                await deleteartistPhotoMutation.mutateAsync({
                    id: currentValues.id
                })
                toast({
                    title: 'Success',
                    message: 'Photo deleted successfully.',
                    type: 'success'
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
        try {
            let newValues = values
            let addedArtist
            // if we have fileData in form Input
            // upload it first
            if (values?.fileData?.file) {
                // First ensure file is not too large
                if (values.fileData.file.size > MAX_FILE_SIZE) {
                    toast({
                        title: 'Error',
                        message:
                            'File size is too large. Please upload a file smaller than 5MB.',
                        type: 'error'
                    })
                    return
                }
                const res = await startUpload([values.fileData.file])
                // Strip fileDate from the mutation data
                delete values.fileData
                if (res) {
                    newValues = {
                        ...values,
                        photoPath: res[0]?.fileUrl
                    }
                }
            }
            if (isEditing && currentValues) {
                addedArtist = await editArtistMutation({
                    id: currentValues?.id,
                    ...newValues
                })
            } else {
                addedArtist = await artistMutation(newValues)
            }
            // XXX: simplify this process, we shouldn't have to prop drill like this
            // maybe pull the modal context into this form?
            onAdd && (await onAdd(addedArtist))
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

    const onUpload = (data: FileData) => {
        setValue('photoPath', data.dataURL)
    }

    const submit = handleSubmit(async (data) => {
        await onSubmit(data)
    })

    return {
        isEditing,
        handleDeletePhoto,
        startUpload,
        submit,
        errors,
        control,
        watch,
        onUpload,
        getValues,
        reset
    }
}
