// Libraries
import { useState, useRef, useEffect } from 'react'
// Components
import { Formik, Form } from 'formik'
import Button from '~/components/Button'
import { DatePicker } from '../Fields'
import FileUploadButton from '~/components/FileUploadButton'
import { Input } from '../Fields'
import FormLayout from '~/layouts/FormLayout'
// Types
import { type FormikContextType } from 'formik'
// Utils
import { api } from '~/utils/api'
// Hooks
import usePostImages from './hooks/usePostImages'
import { useUploadThing } from '~/hooks/useUploadThing'
import Loading from '~/components/Loading'

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

    const { postImages, addPostImage, files, isLoading } = usePostImages(
        events,
        date
    )

    useEffect(() => {
        console.log(isLoading)
    }, [isLoading])

    const initialValues = {
        date: new Date(),
        caption: ''
    }

    console.log('POST IMAGES', postImages)
    return (
        <FormLayout>
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
                        {isLoading ? <Loading /> : null}
                        {postImages.length ? (
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
                        ) : null}
                        {!events?.length && (
                            <div className="w-full text-center text-gray-500">
                                No events scheduled for this day
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
        </FormLayout>
    )
}
