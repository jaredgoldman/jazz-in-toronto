import PlacesAutocomplete from '../Fields/PlacesAutoComplete'
import { Input, Toggle } from '../Fields'
import * as Form from '@radix-ui/react-form'
import Upload from '../Fields/Upload'
import { Heading, Text, Flex, Box, Button, Callout } from '@radix-ui/themes'
import useVenueForm from './hooks/useVenueForm'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import Link from '~/components/Link'

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
        <Flex direction="column" align="center" py="9">
            <Box className="w-full max-w-xl">
                <Heading size="9" mb="6">
                    {isEditing ? 'Edit venue' : 'Add your venue'}
                </Heading>
                <Callout.Root my="6">
                    <Callout.Icon>
                        <InfoCircledIcon />
                    </Callout.Icon>
                    <Callout.Text>
                        Submit your venue gig here and at least 24hrs in advance
                        so our admins have time to review and approve your
                        listing. Once your venue is approved, it will appear in
                        the <Link href="/venues">venues section</Link>
                    </Callout.Text>
                </Callout.Root>

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
