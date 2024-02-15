import { useCallback } from 'react'
import FileUploadButton from '~/components/FileUploadButton'
import { Flex, Button, Text } from '@radix-ui/themes'
import * as Form from '@radix-ui/react-form'
import { FileData } from '~/types/data'
import {
    FieldValues,
    Path,
    Control,
    Controller,
    useFormContext
} from 'react-hook-form'
import { TrashIcon } from '@radix-ui/react-icons'
import { useDropzone } from 'react-dropzone'
import { trimFileName } from '../utils'

interface Props<T extends FieldValues> {
    name: Path<T>
    control: Control<T>
    label?: string
    buttonLabel?: string
    required?: boolean | string
}

export default function Upload<T extends FieldValues>({
    name,
    buttonLabel = 'Upload',
    required,
    control,
    label
}: Props<T>) {
    const { setValue, watch, getValues } = useFormContext<{
        fileData: File | undefined
        photoPath: string
        photoName: string
    }>()

    const removeFile = useCallback(() => {
        setValue('fileData', undefined)
        setValue('photoPath', '')
        setValue('photoName', '')
    }, [setValue])

    const handleUpload = useCallback(
        (files: File[]) => {
            let file = files[0]
            if (file) {
                file = trimFileName(file)
                setValue('fileData', file)
                setValue('photoPath', URL.createObjectURL(file))
                setValue('photoName', file.name)
            }
        },
        [setValue]
    )

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: (files) => handleUpload(files)
    })

    const watchedFileData = watch('fileData')
    const watchedPhotoPath = watch('photoPath')

    return (
        <Controller
            control={control}
            rules={{ required }}
            name={name}
            render={({ field }) => {
                return (
                    <Form.Field {...field}>
                        <Form.Label>{label}</Form.Label>
                        <Flex
                            width="100%"
                            justify="center"
                            my="2"
                            py="6"
                            className="cursor-pointer rounded-md border-2 border-gray-600"
                        >
                            {!watchedPhotoPath && !watchedFileData ? (
                                <Flex {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    {isDragActive ? (
                                        <p>Drop the files here ...</p>
                                    ) : (
                                        <p>
                                            Drop some files here, or click to
                                            select files
                                        </p>
                                    )}
                                </Flex>
                            ) : (
                                <Flex direction="column">
                                    <Text>File uploaded</Text>
                                    <Flex align="center" justify="between">
                                        <Text>{getValues('photoName')}</Text>
                                        <Button
                                            variant="ghost"
                                            size="1"
                                            onClick={removeFile}
                                            type="button"
                                        >
                                            <TrashIcon />
                                        </Button>
                                    </Flex>
                                </Flex>
                            )}
                        </Flex>
                    </Form.Field>
                )
            }}
        />
    )
}
