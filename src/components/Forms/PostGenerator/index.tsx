// Libraries
import { useState, useEffect, RefObject } from 'react'
// Components
import { Formik, Form } from 'formik'
import Button from '~/components/Button'
import Canvas from './components/canvas'
import { DatePicker } from '../Fields'
// Utils
import { api } from '~/utils/api'
// Hooks
import useCanvas from './hooks/useCanvas'

interface Errors {
    date?: string
}

export default function PostGenerator(): JSX.Element {
    const [date, setDate] = useState<Date>(new Date(Date.now()))
    const { data: events } = api.event.getAllByDay.useQuery({
        date
    })

    const canvases = useCanvas(events, date)

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
                onSubmit={(values) => {
                    try {
                        setDate(values.date)
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
                            datePickerProps={{
                                showTimeSelect: false
                            }}
                        />

                        <div>
                            <Button type="submit">Submit</Button>
                        </div>
                    </Form>
                )}
            </Formik>
            {canvases.length > 0 && canvases}
        </div>
    )
}
