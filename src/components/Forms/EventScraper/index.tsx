import { useState } from 'react'
// Components
import { Formik, Form } from 'formik'
import { Select } from '../Fields'
import Button from '~/components/Button'
import SearchTable from '~/components/SearchContainer/components/SearchTable'
import FormLayout from '~/layouts/FormLayout'
// Types
import { type Venue } from '~/types/data'
// Utils
import { api } from '~/utils/api'
import { DataType } from '~/types/enums'
import DatePickerField from '../Fields/DatePicker'

interface Props {
    venues: Venue[]
}

interface Errors {
    venueId?: string
}

export default function EventScraper({ venues }: Props): JSX.Element {
    const [error, setError] = useState<string>('')
    const { isLoading, mutate, data, isSuccess } =
        api.event.getVenueEvents.useMutation()

    const initialValues = {
        venueId: '',
        date: new Date()
    }

    return (
        <FormLayout>
            <h1 className="mb-5">Event Scraper</h1>
            <Formik
                initialValues={initialValues}
                validate={(values) => {
                    const errors: Errors = {}
                    if (!values.venueId) {
                        errors.venueId = 'Required'
                    }
                    return errors
                }}
                onSubmit={(values, { setSubmitting }) => {
                    try {
                        const { venueId, date } = values
                        if (venueId) {
                            mutate({
                                venueId,
                                date
                            })
                        }
                        setSubmitting(false)
                    } catch (e) {
                        setError(
                            "There was an error scraping the venue's events."
                        )
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form className="flex flex-col">
                        <DatePickerField
                            name="date"
                            label="Select a month to scrape"
                            datePickerProps={{
                                dateFormat: 'MM/yyyy',
                                showMonthYearPicker: true,
                                showPreviousMonths: false
                            }}
                        />
                        <Select
                            name="venueId"
                            label="Select a venue to scrape"
                            optionData={venues}
                        />
                        <div className="flex w-full flex-col items-center">
                            <div className="flex h-10 flex-col justify-center text-sm text-red-500">
                                {error && <p>{error}</p>}
                            </div>
                            <Button type="submit" disabled={isSubmitting}>
                                Submit
                            </Button>
                        </div>
                        {isLoading && <div>Loading...</div>}
                        {isSuccess && data && (
                            <>
                                <h2 className="mb-3 mt-5">Results</h2>
                                <SearchTable
                                    items={data}
                                    dataType={DataType.EVENT}
                                />
                            </>
                        )}
                    </Form>
                )}
            </Formik>
        </FormLayout>
    )
}
