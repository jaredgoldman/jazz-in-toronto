// Libraries
import { useState } from 'react'
// Componenets
import FileUploadButton from '~/components/FileUploadButton'
import Image from 'next/image'
import { Flex, Button, Text } from '@radix-ui/themes'
import * as Form from '@radix-ui/react-form'
// Types
import { type FileData } from '~/types/data'
import {
    type FieldValues,
    type Path,
    type FieldError,
    type Control,
    Controller
} from 'react-hook-form'

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
    const [src, setSrc] = useState<string>('')

    const removeFile = async () => {
        // If a photoPath and updatemutation func were provided
        setSrc('')
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
                    setSrc(field.value.dataURL as string)
                }
                return (
                    <Form.Field name={name}>
                        <Form.Label>{label}</Form.Label>
                        <Flex width="100%" justify="center" my="2">
                            {!src ? (
                                <FileUploadButton
                                    onUpload={(data: FileData) => {
                                        setSrc(data.dataURL)
                                        onUpload(data)
                                    }}
                                    label={buttonLabel}
                                    name={name}
                                />
                            ) : (
                                <Flex>
                                    <div className="relative">
                                        <Button
                                            className="absolute left-0 top-0"
                                            size="1"
                                            onClick={void removeFile}
                                        >
                                            X
                                        </Button>
                                        <Image
                                            className="m-3"
                                            src={src}
                                            height={50}
                                            width={50}
                                            alt="Uploaded image"
                                        />
                                    </div>
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
