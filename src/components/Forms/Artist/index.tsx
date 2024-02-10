import * as Form from '@radix-ui/react-form'
import { Input } from '../Fields'
import Upload from '../Fields/Upload'
import { Heading, Flex, Box, Button } from '@radix-ui/themes'
import useArtistForm from './hooks/useArtistForm'
import { useRouter } from 'next/router'
import { FormProvider } from 'react-hook-form'

export default function ArtistForm() {
    const router = useRouter()
    const param = router.query.id as string
    const isAdmin = router.asPath.includes('admin')

    const { submit, methods, isLoading } = useArtistForm(param)

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
                <FormProvider {...methods}>
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
                                control={methods.control}
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
                                <Button className="w-full" disabled={isLoading}>Submit</Button>
                            </Form.Submit>
                        </Flex>
                    </Form.Root>
                </FormProvider>
            </Box>
        </Flex>
    )
}
