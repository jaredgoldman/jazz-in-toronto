// Libraries
import { useState } from 'react'
// Components
import { Formik, Form } from 'formik'
import Button from '~/components/Button'
import { DatePicker } from '../Fields'
import FileUploadButton from '~/components/FileUploadButton'
import { Input } from '../Fields'
// Utils
import { api } from '~/utils/api'
// Hooks
import usePostImages from './hooks/usePostImages'
import { useUploadThing } from '~/hooks/useUploadThing'

interface Errors {
    date?: string
    description?: string
}

export default function PostGenerator(): JSX.Element {
    const [date, setDate] = useState<Date>(new Date())
    const postMutation = api.event.post.useMutation()
    const { data: events } = api.event.getAllByDay.useQuery({
        date
    })

    const { startUpload } = useUploadThing({
        endpoint: 'uploadPosts',
        onClientUploadComplete: () => {
            alert("I'm done!")
        },
        onUploadError: () => {
            alert('Error!')
        }
    })

    const { postImages, addPostImage, files } = usePostImages(events, date)

    const initialValues = {
        date: new Date(),
        caption: ''
    }

    return (
        <div className="w-full">
            <h1 className="mb-5">Event Scraper</h1>
            <Formik
                initialValues={initialValues}
                validate={(values) => {
                    const errors: Errors = {}
                    if (!values.date) {
                        errors.date = 'Required'
                    }
                    if (!values.caption) {
                        errors.description = 'Description required'
                    }
                    return errors
                }}
                onSubmit={async ({ caption }) => {
                    try {
                        const res = await startUpload(Object.values(files))
                        if (res) {
                            postMutation.mutate({ files: res, caption })
                        }
                    } catch (error) {
                        // display error
                    }
                }}
            >
                {() => (
                    <Form className="flex flex-col">
                        <DatePicker
                            label="Select a day to generate a post for"
                            name="date"
                            outerOnChange={setDate}
                            datePickerProps={{
                                showTimeSelect: false
                            }}
                        />
                        <Input name="caption" label="Caption" />
                        {postImages.length && (
                            <div className="my-3 flex w-full justify-center">
                                <div className="flex">
                                    {postImages.map((postImage, index) => {
                                        return (
                                            <div
                                                className="flex items-center justify-center "
                                                key={index}
                                            >
                                                {postImage}
                                            </div>
                                        )
                                    })}
                                    <FileUploadButton
                                        onUpload={({ file, dataURL }) => {
                                            addPostImage(file, dataURL)
                                        }}
                                        className="border-white hover:border"
                                        label="+"
                                    />
                                </div>
                            </div>
                        )}
                        <div className="mb-3 flex w-full justify-center">
                            <Button type="submit">Upload to Instagram</Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
