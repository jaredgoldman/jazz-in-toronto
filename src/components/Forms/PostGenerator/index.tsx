// Libraries
import { useState } from 'react'
// Components
import { Formik, Form } from 'formik'
import Button from '~/components/Button'
import { DatePicker } from '../Fields'
// Utils
import { api } from '~/utils/api'
// Hooks
import useCanvas from './hooks/useCanvas'

interface Errors {
    date?: string
}

export default function PostGenerator(): JSX.Element {
    const [date, setDate] = useState<Date>(new Date())
    const postMutation = api.event.post.useMutation()
    const { data: events } = api.event.getAllByDay.useQuery({
        date
    })

    const { canvases, blobs } = useCanvas(events, date)

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
                onSubmit={() => {
                    try {
                        postMutation.mutate({ blobs })
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
                        <Button type="submit">Generate Post</Button>
                    </Form>
                )}
            </Formik>
            {canvases.length && (
                <div className="my-3 flex w-full justify-center">
                    <div className="grid grid-cols-3 gap-1">
                        {canvases.map((canvas, index) => {
                            return (
                                <div
                                    className="flex items-center justify-center "
                                    key={index}
                                >
                                    {canvas}
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}
