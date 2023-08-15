// Components
import PlacesAutocomplete from '../Fields/PlacesAutoComplete'
import { Input } from '../Fields'
import * as Form from '@radix-ui/react-form'
import Upload from '../Fields/Upload'
import FormLayout from '~/layouts/FormLayout'
import { Heading, Text, Flex } from '@radix-ui/themes'
// Types
import { type Venue } from '~/types/data'
import { forwardRef, useImperativeHandle, type Ref } from 'react'
// Hooks
import useVenueForm from './hooks/useVenueForm'

interface Props {
    currentValues?: Venue
    onAdd?: (value: Venue) => Promise<void>
    externalSubmit?: boolean
}

export default forwardRef(function VenueForm(
    { currentValues, onAdd, externalSubmit = false }: Props,
    ref: Ref<unknown> | undefined
): JSX.Element {
    const {
        venueMutation,
        editVenueMutation,
        handleDeletePhoto,
        errors,
        submit,
        control,
        onUpload,
        onSelectLocation,
        error
    } = useVenueForm(currentValues, onAdd)

    // Leverage useImperitiveHandle to pass submission to parent component
    useImperativeHandle(ref, () => ({
        submitForm: submit
    }))

    return (
        <FormLayout>
            <Heading>
                {currentValues ? 'Edit venue' : 'Add your venue here!'}
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
                <Flex>
                    {venueMutation.isSuccess && (
                        <Text size="2" color="green" align="center">
                            Venue submitted succesfully
                        </Text>
                    )}
                    {editVenueMutation.isSuccess && (
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
                {!externalSubmit && (
                    <Flex width="100%" justify="center">
                        <Form.Submit>Submit</Form.Submit>
                    </Flex>
                )}
            </Form.Root>
        </FormLayout>
    )
})
