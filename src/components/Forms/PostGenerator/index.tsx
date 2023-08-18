// Componenets
import { DatePicker } from '../Fields'
import { Input } from '../Fields'
import FormLayout from '~/layouts/FormLayout'
import { Heading, Flex, Button, Text } from '@radix-ui/themes'
import PostImage from './components/postImage'
import Loading from '~/components/Loading'
import * as Form from '@radix-ui/react-form'
// Hooks
import usePostGenerator from './hooks/usePostGenerator'

export default function PostGenerator(): JSX.Element {
    const { files, control, errors, submit, isLoading, isSuccess, error } =
        usePostGenerator()

    return (
        <FormLayout>
            <Flex align="center" direction="column" grow="1">
                <Form.Root onSubmit={submit} className="max-w-7xl">
                    <Heading mb="3">Generate an Instagram Post</Heading>
                    <DatePicker
                        label="Select a day to generate a post for"
                        name="date"
                        control={control}
                        error={errors.date}
                        datePickerProps={{
                            showTimeSelect: false
                        }}
                    />
                    <Input
                        name="caption"
                        label="Caption"
                        control={control}
                        required="Please enter a caption"
                        error={errors.caption}
                    />
                    <Flex>
                        {isSuccess && (
                            <Text size="2" color="green">
                                Event edited succesfully
                            </Text>
                        )}
                        {error && (
                            <Text size="2" color="red">
                                {error}
                            </Text>
                        )}
                    </Flex>
                    <Flex width="100%" justify="center" mt="3">
                        <Form.Submit asChild>
                            <Button>Post to IG</Button>
                        </Form.Submit>
                    </Flex>
                </Form.Root>
                {files?.length ? (
                    <Flex mt="5" direction={{ initial: 'column', md: 'row' }}>
                        {files.map((file) => {
                            return (
                                <PostImage
                                    key={file.file.name}
                                    src={file.dataURL}
                                />
                            )
                        })}
                    </Flex>
                ) : null}
                {isLoading && <Loading />}
            </Flex>
        </FormLayout>
    )
}
