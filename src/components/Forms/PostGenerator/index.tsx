import { useState } from 'react'
import { DatePicker } from '../Fields'
import { Input } from '../Fields'
import FormLayout from '~/layouts/FormLayout'
import { Heading, Flex, Button, Text, Box } from '@radix-ui/themes'
import PostImage from './components/PostImage'
import Loading from '~/components/Loading'
import * as Form from '@radix-ui/react-form'
import { Card } from '@radix-ui/themes'
import usePostGenerator from './hooks/usePostGenerator'

export default function PostGenerator(): JSX.Element {
    const [srcs, setSrcs] = useState<Set<string>>(new Set())

    const { files, control, errors, submit, isLoading, events } =
        usePostGenerator()

    const removeImage = (index: number) => {
        setSrcs((prev) => {
            const newSet = new Set(prev)
            newSet.delete(Array.from(prev)[index] as string)
            return newSet
        })
    }

    const onUpload = (data: File) => {
        setSrcs((prev) => {
            const newSet = new Set(prev)
            newSet.add(URL.createObjectURL(data))
            return newSet
        })
    }

    return (
        <>
            <FormLayout>
                <Flex align="center" direction="column" grow="1" mb="5">
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
                        <Flex width="100%" justify="center" mt="5">
                            <Form.Submit asChild>
                                <Button>Generate post</Button>
                            </Form.Submit>
                        </Flex>
                    </Form.Root>
                    {files?.length && !isLoading ? (
                        <Flex
                            mt="5"
                            direction={{ initial: 'column', md: 'row' }}
                            className="max-w-screen-2xl overflow-x-auto"
                        >
                            {files.map((file) => {
                                return (
                                    <PostImage
                                        key={file.name}
                                        src={URL.createObjectURL(file)}
                                    />
                                )
                            })}
                            {srcs?.size
                                ? Array.from(srcs).map((src, i) => {
                                      return (
                                          <Flex key={i}>
                                              <div className="relative">
                                                  <Button
                                                      className="absolute left-0 top-0 z-50"
                                                      size="1"
                                                      onClick={() =>
                                                          removeImage(i)
                                                      }
                                                  >
                                                      X
                                                  </Button>
                                                  <PostImage
                                                      key={src}
                                                      src={src}
                                                  />
                                              </div>
                                          </Flex>
                                      )
                                  })
                                : null}
                            <Card m="3" className="p-0">
                                <Flex
                                    align="center"
                                    justify="center"
                                    grow="1"
                                    height="100%"
                                    px="5"
                                >
                                    {/* Replace with dropzone component */}
                                </Flex>
                            </Card>
                        </Flex>
                    ) : (
                        <Box my="5">
                            <Text>No events for this day</Text>
                        </Box>
                    )}
                    {isLoading && <Loading />}
                </Flex>
            </FormLayout>
            <Box mb="4">
                <Heading>Events in this post</Heading>
                <Text size="5">
                    You can edit events that appear in the post here
                </Text>
            </Box>
        </>
    )
}
