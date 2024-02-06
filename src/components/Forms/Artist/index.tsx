import * as Form from '@radix-ui/react-form'
import { Input } from '../Fields'
import Upload from '../Fields/Upload'
import { Heading, Flex, Box, Button } from '@radix-ui/themes'
import useArtistForm from './hooks/useArtistForm'
import { useRouter } from 'next/router'
import { api } from '~/utils/api'
import { useEffect } from 'react'

export default function ArtistForm() {
    const router = useRouter()
    const param = router.query.id as string
    const isAdmin = router.asPath.includes('admin')
    const { data } = api.artist.get.useQuery(
        { id: param },
        { enabled: Boolean(param) }
    )

    const {
        submit,
        errors,
        control,
        onUpload,
        handleDeletePhoto,
        reset,
        getValues
    } = useArtistForm(param)

    useEffect(() => {
        if (data) {
            reset({
                ...data,
                instagramHandle: data.instagramHandle ?? '',
                genre: data.genre ?? '',
                photoPath: data.photoPath ?? '',
                website: data.website ?? '',
                description: data.description ?? ''
            })
        }
    }, [data, reset, getValues])

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
                        {isAdmin ? 'Edit artist' : 'Submit artist'}
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
                            <Button className="w-full">Submit</Button>
                        </Form.Submit>
                    </Flex>
                </Form.Root>
            </Box>
        </Flex>
    )
}
