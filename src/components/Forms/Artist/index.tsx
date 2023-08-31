// Components
import * as Form from '@radix-ui/react-form'
import { Input } from '../Fields'
import Upload from '../Fields/Upload'
import FormLayout from '~/layouts/FormLayout'
import { Heading, Flex, Text } from '@radix-ui/themes'
// Types
import type { FileData } from '~/types/data'
// hooks
import { type BaseSyntheticEvent } from 'react'
import { type ArtistFormValues } from './hooks/useArtistForm'
import type { Control, FieldErrors } from 'react-hook-form'

interface Props {
    artistMutationIsSuccess: boolean
    editArtistMutationIsSuccess: boolean
    handleDeletePhoto: () => Promise<void>
    submit?: (e: BaseSyntheticEvent) => Promise<void>
    error?: string
    errors: FieldErrors<ArtistFormValues>
    control: Control<ArtistFormValues>
    onUpload: (data: FileData) => void
    isEditing: boolean
    showSubmitButton?: boolean
}

export default function ArtistForm({
    artistMutationIsSuccess,
    editArtistMutationIsSuccess,
    handleDeletePhoto,
    submit,
    errors,
    error,
    control,
    onUpload,
    isEditing,
    showSubmitButton = true
}: Props): JSX.Element {
    return (
        <FormLayout>
            <Form.Root onSubmit={submit}>
                <Heading>
                    {isEditing
                        ? `Edit artist`
                        : 'Add your artist to our database'}
                </Heading>
                <Flex direction="column" gap="3">
                    <Input
                        name="name"
                        label="Name"
                        error={errors.name}
                        control={control}
                        required="You must enter a artist name"
                    />
                    <Input
                        name="genre"
                        label="Musical genre"
                        error={errors.genre}
                        control={control}
                    />
                    <Upload
                        name="fileData"
                        label="Upload a artist photo"
                        onUpload={onUpload}
                        onDeletePhoto={handleDeletePhoto}
                        control={control}
                    />
                    <Input
                        name="instagramHandle"
                        label="Instagram Handle"
                        error={errors.instagramHandle}
                        control={control}
                    />
                    <Input
                        name="website"
                        label="Enter your website"
                        error={errors.website}
                        control={control}
                    />
                    <Flex width="100%" align="center" mt="3">
                        {artistMutationIsSuccess && (
                            <Text size="2" color="green" align="center">
                                Event submitted succesfully
                            </Text>
                        )}
                        {editArtistMutationIsSuccess && (
                            <Text size="2" color="green" align="center">
                                Event edited succesfully
                            </Text>
                        )}
                        {error && (
                            <Text size="2" color="red" align="center">
                                {error}
                            </Text>
                        )}
                    </Flex>
                </Flex>
                {showSubmitButton && (
                    <Flex width="100%" justify="center">
                        <Form.Submit>Submit</Form.Submit>
                    </Flex>
                )}
            </Form.Root>
        </FormLayout>
    )
}
