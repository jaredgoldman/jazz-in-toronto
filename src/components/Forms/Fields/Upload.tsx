import { Flex, Button, Text, Box, Separator } from '@radix-ui/themes'
import * as Form from '@radix-ui/react-form'
import {
    FieldValues,
    Path,
    Control,
    Controller,
} from 'react-hook-form'
import {
    TrashIcon,
    UploadIcon,
    CheckIcon,
    TargetIcon,
    ImageIcon
} from '@radix-ui/react-icons'
import { useDropzone } from 'react-dropzone'

interface Props<T extends FieldValues> {
    name: Path<T>
    control: Control<T>
    label?: string
    required?: boolean | string
    onAdd: (files: File[]) => void
    onRemove: () => void
    fileName?: string
}

/**
 * Upload component
 * @param {string} name - The name of the input field
 * @param {Control} control - The control object from react-hook-form
 * @param {string} label - The label for the input field
 * @param {boolean} required - Whether the input field is required
 * @param {Function} onAdd - The function to call when a file is added
 * @param {Function} onRemove - The function to call when a file is removed
 * @param {string} fileName - The name of the file
 */
export default function Upload<T extends FieldValues>({
    name,
    required,
    control,
    label,
    onAdd,
    onRemove,
    fileName
}: Props<T>) {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: (files) => onAdd(files)
    })

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
                            align="center"
                            my="2"
                            className="h-[12.5rem] rounded-md border-2 border-gray-600"
                        >
                            {!fileName ? (
                                <Box
                                    {...getRootProps()}
                                    className="cursor-pointer"
                                >
                                    <input {...getInputProps()} />
                                    {isDragActive ? (
                                        <Flex
                                            direction="column"
                                            align="center"
                                            gap="4"
                                        >
                                            <TargetIcon
                                                width="50"
                                                height="50"
                                            />
                                            <Text>Drop the files here ...</Text>
                                        </Flex>
                                    ) : (
                                        <Flex
                                            direction="column"
                                            align="center"
                                            gap="4"
                                        >
                                            <UploadIcon
                                                width="50"
                                                height="50"
                                            />
                                            <Text>
                                                Drop some files here, or click
                                                to select files
                                            </Text>
                                        </Flex>
                                    )}
                                </Box>
                            ) : (
                                <Flex
                                    direction="column"
                                    align="center"
                                    gap="4"
                                    width="100%"
                                >
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
                                        <Separator
                                            orientation="horizontal"
                                            size="4"
                                        />
                                        <Flex
                                            align="center"
                                            justify="between"
                                            width="100%"
                                        >
                                            <Flex gap="2" align="center">
                                                <ImageIcon
                                                    width="10"
                                                    height="10"
                                                />
                                                <Text color="orange">
                                                    {fileName}
                                                </Text>
                                            </Flex>
                                            <Button variant="ghost">
                                                <TrashIcon
                                                    width="20"
                                                    height="20"
                                                    onClick={onRemove}
                                                />
                                            </Button>
                                        </Flex>
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
