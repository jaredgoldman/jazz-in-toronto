// Components
import PlacesAutocomplete from '../Fields/PlacesAutoComplete'
import { Input } from '../Fields'
import * as Form from '@radix-ui/react-form'
import Upload from '../Fields/Upload'
import FormLayout from '~/layouts/FormLayout'
import { Heading, Text, Flex } from '@radix-ui/themes'
// Types
import type { FileData } from '~/types/data'
import { type VenueFormValues } from './hooks/useVenueForm'
import type { Control, FieldErrors } from 'react-hook-form'
import { type BaseSyntheticEvent } from 'react'

interface Props {
    venueMutationIsSuccess: boolean
    editVenueMutationIsSuccess: boolean
    handleDeletePhoto: () => Promise<void>
    errors: FieldErrors<VenueFormValues>
    error?: string
    control: Control<VenueFormValues>
    onSelectLocation: (
        address: string,
        latitude: number,
        longitude: number,
        city: string
    ) => void
    submit?: (e: BaseSyntheticEvent) => Promise<void>
    onUpload: (data: FileData) => void
    isEditing: boolean
    showSubmitButton?: boolean
}

export default function VenueForm({
    venueMutationIsSuccess,
    editVenueMutationIsSuccess,
    handleDeletePhoto,
    errors,
    error,
    control,
    submit,
    onUpload,
    isEditing = false,
    onSelectLocation,
    showSubmitButton
}: Props): JSX.Element {
    return (
        <FormLayout>
            <Heading>
                {isEditing ? 'Edit venue' : 'Add your venue here!'}
            </Heading>
            <Form.Root onSubmit={submit}>
                <Flex direction="column" gap="3">
                    <Input
                        name="name"
                        label="Venue Name"
                        error={errors.name}
                        control={control}
                        required="Please eneter your venues name"
                    />
                    <PlacesAutocomplete
                        name="address"
                        label="Address"
                        control={control}
                        onSelect={onSelectLocation}
                    />
                    <Upload
                        name="fileData"
                        label="Upload a photo of your venue"
                        onUpload={onUpload}
                        control={control}
                        onDeletePhoto={handleDeletePhoto}
                    />
                    <Input
                        name="phoneNumber"
                        label="Enter your venues phone number"
                        error={errors.phoneNumber}
                        type="number"
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
                        label="Venue Website"
                        error={errors.website}
                        control={control}
                    />
                </Flex>
                <Flex width="100%" align="center" mt="3">
                    {venueMutationIsSuccess && (
                        <Text size="2" color="green" align="center">
                            Venue submitted succesfully
                        </Text>
                    )}
                    {editVenueMutationIsSuccess && (
                        <Text size="2" color="green" align="center">
                            Venue edited succesfully
                        </Text>
                    )}
                    {error && (
                        <Text size="2" color="red" align="center">
                            {error}
                        </Text>
                    )}
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
