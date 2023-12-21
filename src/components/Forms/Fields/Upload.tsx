import { useState } from 'react'
import FileUploadButton from '~/components/FileUploadButton'
import { Flex, Button, Text } from '@radix-ui/themes'
import * as Form from '@radix-ui/react-form'
import { FileData } from '~/types/data'
import {
    FieldValues,
    Path,
    FieldError,
    Control,
    Controller
} from 'react-hook-form'
import { TrashIcon } from '@radix-ui/react-icons'

interface Props<T extends FieldValues> {
    name: Path<T>
    onUpload: (data: FileData) => void
    control: Control<T>
    label?: string
    buttonLabel?: string
    onDeletePhoto?: () => Promise<void>
    error?: FieldError
    required?: boolean | string
}

export default function Upload<T extends FieldValues>({
    name,
    buttonLabel = 'Upload',
    onDeletePhoto,
    required,
    control,
    error,
    onUpload,
    label
}: Props<T>) {
    const [fileData, setFileData] = useState<FileData | null>()

    const removeFile = async () => {
        // If a photoPath and updatemutation func were provided
        setFileData(null)
        // we're editing and we can call the mutation to remove the photo
        if (onDeletePhoto) {
            await onDeletePhoto()
        }
    }

    return (
        <Controller
            control={control}
            rules={{ required }}
            name={name}
            render={({ field }) => {
                if (field.value) {
                    setFileData(field.value as FileData)
                }
                return (
                    <Form.Field name={name}>
                        <Form.Label>{label}</Form.Label>
                        <Flex
                            width="100%"
                            justify="center"
                            my="2"
                            py="6"
                            className="cursor-pointer rounded-md border-2 border-gray-600"
                        >
                            {!fileData ? (
                                <FileUploadButton
                                    onUpload={(data: FileData) => {
                                        setFileData(data)
                                        onUpload(data)
                                    }}
                                    label={buttonLabel}
                                />
                            ) : (
                                <Flex direction="column">
                                    <Text>File uploaded</Text>
                                    <Flex align="center" justify="between">
                                        <Text>{fileData.file.name}</Text>
                                        <Button
                                            variant="ghost"
                                            size="1"
                                            onClick={removeFile}
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
