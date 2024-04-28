import PlacesAutocomplete from '../Fields/PlacesAutoComplete'
import { Input } from '../Fields'
import * as Form from '@radix-ui/react-form'
import Upload from '../Fields/Upload'
import { Heading, Flex, Box, Button } from '@radix-ui/themes'
import useVenueForm from './hooks/useVenueForm'
import { useRouter } from 'next/router'
import { FormProvider } from 'react-hook-form'

export default function VenueForm() {
    const router = useRouter()
    const isAdmin = router.asPath.includes('admin')
    const param = router.query.id as string | undefined

    const { submit, methods, isLoading, hasSubmitted } = useVenueForm(param, isAdmin)

    const {
        control,
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
                            />
                            <PlacesAutocomplete
                                name="address"
                                label="Address"
                                control={control}
                            />
                            <Upload
                                name="fileData"
                                label="Upload a photo of your venue"
                                control={control}
                            />
                            <Input
                                name="phoneNumber"
                                label="Enter your venues phone number"
                                error={errors.phoneNumber}
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
                            {isAdmin && (
                                <Input
                                    name="description"
                                    label="Featured description"
                                    type="textarea"
                                    error={errors.description}
                                    control={control}
                                />
                            )}
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
