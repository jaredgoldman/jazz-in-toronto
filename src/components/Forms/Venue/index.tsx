import PlacesAutocomplete from '../Fields/PlacesAutoComplete'
import { Input, Toggle } from '../Fields'
import * as Form from '@radix-ui/react-form'
import Upload from '../Fields/Upload'
import { Heading, Text, Flex, Box, Button } from '@radix-ui/themes'
import useVenueForm from './hooks/useVenueForm'

export default function VenueForm() {
    const {
        isEditing,
        submit,
        errors,
        control,
        onSelectLocation,
        onUpload,
        handleDeletePhoto,
        venueMutationIsSuccess,
        editVenueMutationIsSuccess,
        error
    } = useVenueForm()
    return (
        <Flex
            direction="column"
            align="center"
            width="100%"
            className="max-w-xl"
        >
            <Box className="w-full">
                <Heading
                    size={{ initial: '8', xs: '9' }}
                    mb="6"
                    align={{ initial: 'center', xs: 'left' }}
                >
                    {isEditing ? 'Edit venue' : 'Add your venue'}
                </Heading>
                <Form.Root onSubmit={submit}>
                    <Flex direction="column" gap="5">
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
                        {isEditing && (
                            <Toggle
                                label="Featured"
                                name="featured"
                                control={control}
                                error={errors.featured}
                            />
                        )}
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
                    <Flex width="100%" justify="center">
                        <Form.Submit asChild>
                            <Button className="w-full" variant="solid">
                                Submit
                            </Button>
                        </Form.Submit>
                    </Flex>
                </Form.Root>
            </Box>
        </Flex>
    )
}
