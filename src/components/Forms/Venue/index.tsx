import PlacesAutocomplete from '../Fields/PlacesAutoComplete'
import { Input } from '../Fields'
import * as Form from '@radix-ui/react-form'
import Upload from '../Fields/Upload'
import { Heading, Flex, Box, Button } from '@radix-ui/themes'
import useVenueForm from './hooks/useVenueForm'
import { useRouter } from 'next/router'
import { api } from '~/utils/api'
import { useEffect } from 'react'

export default function VenueForm() {
    const router = useRouter()
    const param = router.query.id as string
    const { data } = api.venue.get.useQuery(
        { id: param },
        { enabled: Boolean(param) }
    )
    const {
        isEditing,
        submit,
        errors,
        control,
        onSelectLocation,
        onUpload,
        handleDeletePhoto,
        reset
    } = useVenueForm(!!param)

    useEffect(() => {
        if (data) {
            reset({
                ...data,
                instagramHandle: data.instagramHandle ?? '',
                photoPath: data.photoPath ?? ''
            })
        }
    }, [data, reset])

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
                    {isEditing ? 'Edit venue' : 'Add your venue'}
                </Heading>
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
                            initialValue={data?.address}
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
