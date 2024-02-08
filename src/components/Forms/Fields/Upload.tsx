import FileUploadButton from '~/components/FileUploadButton'
import { Flex, Button, Text } from '@radix-ui/themes'
import * as Form from '@radix-ui/react-form'
import { FileData } from '~/types/data'
import {
    FieldValues,
    Path,
    FieldError,
    Control,
    Controller,
    useFormContext
} from 'react-hook-form'
import { TrashIcon } from '@radix-ui/react-icons'
import { useCallback } from 'react'

interface Props<T extends FieldValues> {
    name: Path<T>
    control: Control<T>
    label?: string
    buttonLabel?: string
    error?: FieldError
    required?: boolean | string
}

export default function Upload<T extends FieldValues>({
    name,
    buttonLabel = 'Upload',
    required,
    control,
    error,
    label
}: Props<T>) {
    const { setValue, watch, getValues } = useFormContext<{
        fileData: FileData | undefined
        photoPath: string
        photoName: string
    }>()

    const removeFile = useCallback(() => {
        setValue('fileData', undefined)
        setValue('photoPath', '')
        setValue('photoName', '')
    }, [setValue])

    const handleUpload = useCallback(
        (data: FileData) => {
            setValue('fileData', data)
            setValue('photoPath', data.dataURL)
            setValue('photoName', data.file.name)
        },
        [setValue]
    )

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
                                <FileUploadButton
                                    onUpload={handleUpload}
                                    label={buttonLabel}
                                />
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
                        {error && (
                            <Text size="2" color="red">
                                {error.message}
                            </Text>
                        )}
                    </Form.Field>
                )
            }}
        />
    )
}
