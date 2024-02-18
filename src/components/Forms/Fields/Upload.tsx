import { useCallback } from 'react'
import { Flex, Button, Text, Box, Separator } from '@radix-ui/themes'
import * as Form from '@radix-ui/react-form'
import {
    FieldValues,
    Path,
    Control,
    Controller,
    useFormContext
} from 'react-hook-form'
import {
    TrashIcon,
    UploadIcon,
    CheckIcon,
    TargetIcon,
    ImageIcon
} from '@radix-ui/react-icons'
import { DropzoneRootProps, DropzoneState, useDropzone } from 'react-dropzone'
import { trimFileName } from '../utils'
import { setFormValues } from '../utils'

interface Props<T extends FieldValues> {
    name: Path<T>
    control: Control<T>
    label?: string
    buttonLabel?: string
    required?: boolean | string
}

type BaseUplaodProps = {
    dropzoneProps: DropzoneState
    photoPath: string
    fileData: File | undefined
    removeFile: () => void
}

const BaseUpload = ({
    dropzoneProps: { getRootProps, getInputProps, isDragActive },
    photoPath,
    fileData,
    removeFile
}: BaseUplaodProps) => {
    return (
        <Flex
            width="100%"
            justify="center"
            align="center"
            my="2"
            className="h-[12.5rem] rounded-md border-2 border-gray-600"
        >
            {!photoPath && !fileData ? (
                <Box {...getRootProps()} className="cursor-pointer">
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <Flex direction="column" align="center" gap="4">
                            <TargetIcon width="50" height="50" />
                            <Text>Drop the files here ...</Text>
                        </Flex>
                    ) : (
                        <Flex direction="column" align="center" gap="4">
                            <UploadIcon width="50" height="50" />
                            <Text>
                                Drop some files here, or click to select files
                            </Text>
                        </Flex>
                    )}
                </Box>
            ) : (
                <Flex direction="column" align="center" gap="4" width="100%">
                    <CheckIcon
                        width="50"
                        height="50"
                        className="text-green-500"
                    />
                    <Flex
                        direction="column"
                        align="start"
                        gap="2"
                        width="100%"
                        px={{ initial: '5', xs: '9' }}
                    >
                        <Text>File uploaded</Text>
                        <Separator orientation="horizontal" size="4" />
                        <Flex align="center" justify="between" width="100%">
                            <Flex gap="2" align="center">
                                <ImageIcon width="10" height="10" />
                                <Text color="orange">{fileData?.name}</Text>
                            </Flex>
                            <Button variant="ghost">
                                <TrashIcon
                                    width="20"
                                    height="20"
                                    onClick={removeFile}
                                />
                            </Button>
                        </Flex>
                    </Flex>
                </Flex>
            )}
        </Flex>
    )
}

export default function Upload<T extends FieldValues>({
    name,
    required,
    control,
    label
}: Props<T>) {
    const { setValue, watch } = useFormContext<{
        fileData: File | undefined
        photoPath: string
        photoName: string
    }>()

    const removeFile = useCallback(() => {
        setFormValues(
            {
                fileData: undefined,
                photoPath: '',
                photoName: ''
            },
            setValue
        )
    }, [setValue])

    const handleUpload = useCallback(
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

    const dzProps = useDropzone({
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
                        <BaseUpload
                            dropzoneProps={dzProps}
                            photoPath={watchedPhotoPath}
                            fileData={watchedFileData}
                            removeFile={removeFile}
                        />
                    </Form.Field>
                )
            }}
        />
    )
}
