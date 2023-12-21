import * as Form from '@radix-ui/react-form'
import { Input, Toggle } from '../Fields'
import Upload from '../Fields/Upload'
import { Heading, Flex, Text, Box, Button } from '@radix-ui/themes'
import useArtistForm from './hooks/useArtistForm'

export default function ArtistForm({ selectedArtist }) {
  const {
    submit,
    isEditing,
    errors,
    control,
    onUpload,
    handleDeletePhoto,
    artistMutationIsSuccess,
    editArtistMutationIsSuccess,
    error
  } = useArtistForm(selectedArtist)

    return (
        <Flex
            direction="column"
            align="center"
            width="100%"
            className="max-w-xl"
        >
            <Box className="w-full">
                <Form.Root onSubmit={submit}>
                    <Heading
                        size={{ initial: '8', xs: '9' }}
                        align={{ initial: 'center', xs: 'left' }}
                        mb="6"
                    >
                        {isEditing ? `Edit artist` : 'Submit artist'}
                    </Heading>
                    <Flex direction="column" gap="5">
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
                        {isEditing && (
                            <Toggle
                                label="Featured"
                                name="featured"
                                control={control}
                                error={errors.featured}
                            />
                        )}

                        <Flex width="100%" align="center">
                            {artistMutationIsSuccess && (
                                <Text size="2" color="green" align="center">
                                    Artist submitted succesfully
                                </Text>
                            )}
                            {editArtistMutationIsSuccess && (
                                <Text size="2" color="green" align="center">
                                    Artist edited succesfully
                                </Text>
                            )}
                            {error && (
                                <Text size="2" color="red" align="center">
                                    {error}
                                </Text>
                            )}
                        </Flex>
                    </Flex>
                    <Flex width="100%" justify="center">
                        <Form.Submit asChild>
                            <Button className="w-full">Submit</Button>
                        </Form.Submit>
                    </Flex>
                </Form.Root>
            </Box>
        </Flex>
    )
}
