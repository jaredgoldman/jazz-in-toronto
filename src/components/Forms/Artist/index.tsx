import * as Form from '@radix-ui/react-form'
import { Input, Select } from '../Fields'
import Upload from '../Fields/Upload'
import { Heading, Flex, Box, Button, Callout } from '@radix-ui/themes'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import useArtistForm from './hooks/useArtistForm'
import { useRouter } from 'next/router'
import Spinner from '~/components/Spinner'
import { genreLabels } from '~/utils/labels'
import Toggle from '../Fields/Toggle'

export default function ArtistForm() {
    const router = useRouter()
    const param = router.query.id as string
    const isAdmin = router.asPath.includes('admin')

    const {
        submit,
        isLoading,
        handleAddPhoto,
        handleRemovePhoto,
        hasSubmitted,
        errors,
        watch,
        control
    } = useArtistForm(param, isAdmin)

    return (
        <Flex
            direction="column"
            align="center"
            width="100%"
            className="min-h-[30rem] max-w-xl"
            py="6"
        >
            <Box className="w-full">
                <Form.Root onSubmit={submit}>
                    <Heading
                        size={{ initial: '8', xs: '9' }}
                        align={{ initial: 'center', xs: 'left' }}
                        mb="6"
                    >
                        {param ? 'Edit artist' : 'Submit artist'}
                    </Heading>
                    <Flex direction="column" gap="5">
                        <Input
                            name="name"
                            label="Name"
                            error={errors.name}
                            control={control}
                            required="You must enter a artist name"
                            placeholder="Enter the artist name"
                        />
                        <Select
                            name="genre"
                            label="Musical genre"
                            error={errors.genre ?? undefined}
                            control={control}
                            optionData={Object.entries(genreLabels).map(
                                ([id, name]) => ({
                                    id,
                                    name
                                })
                            )}
                        />
                        <Upload
                            name="fileData"
                            label="Upload a artist photo"
                            control={control}
                            onAdd={handleAddPhoto}
                            onRemove={handleRemovePhoto}
                            fileName={watch('photoName')}
                        />
                        <Input
                            name="instagramHandle"
                            label="Instagram Handle"
                            error={errors.instagramHandle}
                            control={control}
                            placeholder="Enter your Instagram handle (e.g., @example)"
                        />
                        <Input
                            name="website"
                            label="Enter your website"
                            error={errors.website}
                            control={control}
                            placeholder="Enter your website (e.g., www.example.com)"
                        />
                        <Input
                            name="description"
                            label="Description"
                            type="textarea"
                            error={errors.description}
                            control={control}
                            placeholder="Enter a description of the artist"
                        />
                        <Input
                            name="email"
                            label="Enter an email to be notified when your artist is approved (optional)"
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
                            {isLoading ? (
                                <Flex justify="center">
                                    <Spinner />
                                </Flex>
                            ) : (
                                <Button
                                    className="w-full"
                                    disabled={isLoading || hasSubmitted}
                                >
                                    Submit
                                </Button>
                            )}
                        </Form.Submit>
                    </Flex>
                </Form.Root>
            </Box>
        </Flex>
    )
}
