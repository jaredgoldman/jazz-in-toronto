import PlacesAutocomplete from '../Fields/PlacesAutoComplete'
import { Input } from '../Fields'
import * as Form from '@radix-ui/react-form'
import Upload from '../Fields/Upload'
import { Heading, Flex, Box, Button } from '@radix-ui/themes'
import useVenueForm from './hooks/useVenueForm'
import { useRouter } from 'next/router'
import { FormProvider } from 'react-hook-form'
import Toggle from '../Fields/Toggle'

export default function VenueForm() {
    const router = useRouter()
    const isAdmin = router.asPath.includes('admin')
    const param = router.query.id as string | undefined

    const {
        submit,
        methods,
        isLoading,
        handleAddPhoto,
        handleRemovePhoto,
        hasSubmitted
    } = useVenueForm(param, isAdmin)

    const {
        control,
        watch,
        formState: { errors }
    } = methods

    return (
        <Flex
            direction="column"
            align="center"
            width="100%"
            className="min-h-[30rem] max-w-xl"
            py="6"
        >
            <Box className="w-full">
                <Heading
                    size={{ initial: '8', xs: '9' }}
                    mb="6"
                    align={{ initial: 'center', xs: 'left' }}
                >
                    {param ? 'Edit venue' : 'Submit venue'}
                </Heading>
                <FormProvider {...methods}>
                    <Form.Root onSubmit={submit}>
                        <Flex direction="column" gap="5">
                            <Input
                                name="name"
                                label="Venue Name"
                                error={errors.name}
                                control={control}
                                required="Please enter your venues name"
                                placeholder="Enter the venue name"
                            />
                            <PlacesAutocomplete
                                name="address"
                                label="Address"
                                control={control}
                                required="Please enter your venues address"
                            />
                            <Upload
                                name="fileData"
                                label="Upload a photo of your venue"
                                control={control}
                                onAdd={handleAddPhoto}
                                onRemove={handleRemovePhoto}
                                fileName={watch('photoName')}
                            />
                            <Input
                                name="phoneNumber"
                                label="Enter your venues phone number"
                                error={errors.phoneNumber}
                                control={control}
                                placeholder="Enter the venue phone number (e.g., 555-555-5555)"
                            />
                            <Input
                                name="instagramHandle"
                                label="Instagram Handle"
                                error={errors.instagramHandle}
                                control={control}
                                rules={{
                                    pattern: {
                                        value: /^@([a-zA-Z0-9_]{1,30})$/,
                                        message:
                                            'Instagram handle must start with @ and be up to 30 characters long'
                                    }
                                }}
                                placeholder="Enter the venue instagram handle (e.g., @example)"
                            />
                            <Input
                                name="website"
                                label="Venue Website"
                                error={errors.website}
                                control={control}
                                placeholder="Enter the venue website (e.g., www.example.com)"
                            />
                            <Input
                                name="description"
                                label="Description"
                                type="textarea"
                                error={errors.description}
                                control={control}
                                placeholder="Enter a description of the venue"
                            />
                            <Input
                                name="email"
                                label="Enter an email to be notified when your event is approved (optional)"
                                type="email"
                                error={errors.email}
                                control={control}
                                placeholder="Enter your email address"
                            />
                            {isAdmin ? (
                                <Toggle
                                    label="Approved"
                                    name="approved"
                                    control={control}
                                    error={errors.approved}
                                />
                            ) : null}
                            <Form.Submit asChild>
                                <Button
                                    className="w-full"
                                    variant="solid"
                                    disabled={isLoading || hasSubmitted}
                                >
                                    Submit
                                </Button>
                            </Form.Submit>
                        </Flex>
                    </Form.Root>
                </FormProvider>
            </Box>
        </Flex>
    )
}
