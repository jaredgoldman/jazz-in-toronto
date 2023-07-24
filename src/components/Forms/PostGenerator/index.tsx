// Libraries
import { useState, useEffect } from 'react'
// Components
import { Formik, Form } from 'formik'
import Button from '~/components/Button'
import Gallery from '~/components/Gallery'
import { DatePicker } from '../Fields'
// Utils
import { api } from '~/utils/api'

export default function PostGenerator(): JSX.Element {
    const [postImages, setPostImages] = useState<string[]>([])
    const { mutate, data, isLoading } = api.event.post.useMutation()

    const initialValues = {
        date: new Date()
    }

    useEffect(() => {
        if (data) {
            setPostImages(data)
        }
    }, [data])

    return (
        <div className="w-full">
            <h1 className="mb-5">Event Scraper</h1>
            <Formik
                initialValues={initialValues}
                validate={(values) => {
                    const errors: any = {}
                    if (!values.date) {
                        errors.date = 'Required'
                    }
                    return errors
                }}
                onSubmit={async (values) => {
                    try {
                        setPostImages([])
                        mutate(values)
                    } catch (error) {
                        // display error
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form className="flex flex-col">
                        <DatePicker
                            label="Select a day to generate a post for"
                            name="date"
                            showTimeSelect={false}
                        />

                        <div>
                            <Button type="submit" disabled={isSubmitting}>
                                Submit
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
            <div>
                {isLoading && <div>Loading...</div>}
                {postImages.length && (
                    <>
                        <Gallery images={postImages} />
                        <div>
                            <Button>Post to Instagram</Button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
