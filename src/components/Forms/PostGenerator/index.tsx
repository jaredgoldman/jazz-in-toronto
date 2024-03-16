import { useCallback, useState } from 'react'
import { Heading, Flex, Text, Box, TextField, Button } from '@radix-ui/themes'
import PostImage from './components/PostImage'
import Loading from '~/components/Loading'
import usePostImages from './hooks/usePostImages'
import JSZip from 'jszip'

/**
 * PostGenerator component
 * @returns The PostGenerator component
 */
export default function PostGenerator() {
    const [date, setDate] = useState(
        // Grab just the time string
        new Date().toISOString().split('T')[0] as string
    )

    const { files, isLoading } = usePostImages(date)
    /**
     * Save the file as a blob
     * @param {Blob} blob - The blob to save
     * @param {string} fileName - The name of the file
     * @returns The file
     */
    const saveAs = useCallback((blob: Blob, fileName: string) => {
        const link = document.createElement('a')
        const url = URL.createObjectURL(blob)
        link.href = url
        link.download = fileName
        document.body.appendChild(link)
        link.click()
        setTimeout(() => {
            document.body.removeChild(link)
            window.URL.revokeObjectURL(url)
        }, 0)
    }, [])

    /**
     * Download the files as a zip
     * @returns The zip file
     */
    const downloadFiles = useCallback(async () => {
        if (files?.length) {
            const zip = new JSZip()
            files.forEach((file) => {
                zip.file(file.name, file)
            })
            saveAs(await zip.generateAsync({ type: 'blob' }), 'post-images.zip')
        }
    }, [files, saveAs])

    return (
        <Flex align="center" direction="column" grow="1" gap="5">
            <Heading>Generate an Instagram Post</Heading>
            <Flex direction="column" gap="1">
                <Text>Select a date</Text>
                <TextField.Input
                    name="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </Flex>
            {files?.length && !isLoading ? (
                <Flex
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
                </Flex>
            ) : (
                <Box my="5">
                    <Text>No events for this day</Text>
                </Box>
            )}
            {isLoading && <Loading />}
            <Button onClick={downloadFiles}>Download Images</Button>
        </Flex>
    )
}
