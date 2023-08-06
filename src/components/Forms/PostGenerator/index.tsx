// Libraries
import { useState, useRef } from 'react'
// Components
import { Formik, Form } from 'formik'
import Button from '~/components/Button'
import { DatePicker } from '../Fields'
import FileUploadButton from '~/components/FileUploadButton'
import { Input } from '../Fields'
// Types
import { type FormikContextType } from 'formik'
// Utils
import { api } from '~/utils/api'
// Hooks
import usePostImages from './hooks/usePostImages'
import { useUploadThing } from '~/hooks/useUploadThing'

interface Values {
    date: Date
    caption: string
}

interface Errors {
    date?: string
    caption?: string
}

export default function PostGenerator(): JSX.Element {
    const formikRef = useRef<FormikContextType<Values>>(null)
    const [error, setError] = useState<string>('')
    const [date, setDate] = useState<Date>(new Date())
    const postMutation = api.event.post.useMutation()
    const { data: events } = api.event.getAllByDay.useQuery({
        date
    })

    // Handle file uploads and form submission
    const { startUpload } = useUploadThing({
        endpoint: 'uploadPosts',
        onClientUploadComplete: (uploadedFileData) => {
            if (uploadedFileData && formikRef.current) {
                const { caption } = formikRef.current.values
                try {
                    postMutation.mutate({ caption, files: uploadedFileData })
                } catch {
                    setError(
                        'There was an error uploading your data. Please try again.'
                    )
                }
                formikRef.current.setSubmitting(false)
            }
        },
        onUploadError: () => {
            setError(
                'There was an error uploading your image data. Is your file too large?'
            )
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
                innerRef={formikRef}
                initialValues={initialValues}
                validate={(values) => {
                    const errors: Errors = {}
                    if (!values.date) {
                        errors.date = 'Required'
                    }
                    if (!values.caption) {
                        errors.caption = 'Caption required'
                    }
                    return errors
                }}
                onSubmit={async () => {
                    await startUpload(Object.values(files))
                }}
            >
                {({ isSubmitting }) => (
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
                        {postImages.length && !postMutation.isSuccess && (
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
                        <div className="flex w-full flex-col items-center">
                            <div className="flex h-10 flex-col justify-center text-sm">
                                {error && (
                                    <p className="text-red-500">{error}</p>
                                )}
                                {postMutation.isSuccess && (
                                    <div className="text-green-500">
                                        Success!
                                    </div>
                                )}
                            </div>
                            <Button type="submit" disabled={isSubmitting}>
                                Submit
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
