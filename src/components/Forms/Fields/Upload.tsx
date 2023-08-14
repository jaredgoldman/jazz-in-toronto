import { useState } from 'react'
import FileUploadButton from '~/components/FileUploadButton'
import Image from 'next/image'
import { type FileData } from '~/types/data'
import {
    Controller,
    Control,
    FieldValues,
    Path,
    FieldError,
    UseFormSetValue
} from 'react-hook-form'
import * as Form from '@radix-ui/react-form'
import { Flex, Button, Text } from '@radix-ui/themes'

interface Props<T extends FieldValues> {
    name: Path<T>
    label?: string
    buttonLabel?: string
    className?: string
    buttonClassName?: string
    itemId?: string
    onDeletePhoto?: () => Promise<void>
    control: Control<T>
    error?: FieldError
    required?: boolean | string
    setValue?: UseFormSetValue<T>
}

export default function Upload<T extends FieldValues>({
    name,
    buttonLabel = 'Upload',
    onDeletePhoto,
    required,
    control,
    error,
    setValue
}: Props<T>) {
    const [src, setSrc] = useState<string>('')

    const removeFile = async () => {
        console.log('REMOVING FILE')
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
                    setSrc(field.value.dataURL)
                }
                return (
                    <Form.Field name={name}>
                        <Form.Label></Form.Label>
                        <Flex>
                            {!src ? (
                                <FileUploadButton
                                    onUpload={(data: FileData) => {
                                        setSrc(data.dataURL)
                                        if (data && setValue) {
                                            setValue(
                                                'fileData' as Path<T>,
                                                data as any
                                            )
                                        }
                                    }}
                                    label={buttonLabel}
                                    name={name}
                                />
                            ) : (
                                <Flex>
                                    <div className="relative">
                                        <Button
                                            className="absolute left-0 top-0"
                                            onClick={removeFile}
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
