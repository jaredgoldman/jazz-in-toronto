// Libraries
import { useEffect, useState } from 'react'
// Components
import { Formik, Form } from 'formik'
import Button from '~/components/Button'
import { DatePicker } from '../Fields'
// Utils
import { api } from '~/utils/api'
// Hooks
import useCreatePosts from './hooks/useCreatePosts'
import { useUploadThing } from '~/hooks/useUploadThing'

interface Errors {
    date?: string
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

    useCreatePosts(events, date)

    // useEffect(() => {
    //     console.log('POSTDATA', postData)
    // }, [postData])

    const initialValues = {
        date: new Date()
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
                    return errors
                }}
                onSubmit={async () => {
                    try {
                        // const res = await startUpload(Object.values(files))
                        // if (res) {
                        //     postMutation.mutate(res)
                        // }
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
                        <div className="mb-3 flex w-full justify-center">
                            <Button type="submit">Upload</Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
