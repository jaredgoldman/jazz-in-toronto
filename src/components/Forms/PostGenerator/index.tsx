import { useEffect, useState } from 'react'
import { Input } from '../Fields'
import { Heading, Flex, Button, Text, Box } from '@radix-ui/themes'
import PostImage from './components/PostImage'
import Loading from '~/components/Loading'
import * as Form from '@radix-ui/react-form'
import { Card } from '@radix-ui/themes'
import usePostGenerator from './hooks/usePostGenerator'

export default function PostGenerator(): JSX.Element {
    const [srcs, setSrcs] = useState<Set<string>>(new Set())

    const { files, control, errors, submit, isLoading } = usePostGenerator()
    useEffect(() => {
        const loadFont = async () => {
            await document.fonts.load('50px poppins')
        }
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        loadFont()
    }, [])

    // const removeImage = useCallback((index: number) => {
    //     setSrcs((prev) => {
    //         const newSet = new Set(prev)
    //         newSet.delete(Array.from(prev)[index] as string)
    //         return newSet
    //     })
    // }, [])

    // const onUpload = (data: File) => {
    //     setSrcs((prev) => {
    //         const newSet = new Set(prev)
    //         newSet.add(URL.createObjectURL(data))
    //         return newSet
    //     })
    // }

    return (
        <>
            <Flex align="center" direction="column" grow="1" mb="5">
                <Form.Root onSubmit={submit} className="max-w-7xl">
                    <Heading mb="3">Generate an Instagram Post</Heading>
                    <Input
                        label="Select a day to generate a post for"
                        name="date"
                        control={control}
                        error={errors.date}
                        type="date"
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
                                                  // onClick={() => removeImage(i)}
                                              >
                                                  X
                                              </Button>
                                              <PostImage src={src} />
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
                                <Button className="w-full" disabled={isLoading}>
                                    Generate post
                                </Button>
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
        </>
    )
}
