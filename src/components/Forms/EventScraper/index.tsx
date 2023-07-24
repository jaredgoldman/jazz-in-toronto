import { useEffect, useState } from 'react'
import { Venue } from '~/types/data'
import Button from '~/components/Button'
import { api } from '~/utils/api'
import { Formik, Form } from 'formik'
import { Select } from '../Fields'

interface Props {
    venues: Venue[]
}

export default function EventScraper({ venues }: Props): JSX.Element {
    const eventScraperMutation = api.event.getVenueEvents.useMutation()

    const initialValues = {
        venueId: ''
    }

    // useEffect(() => {
    //     if (eventScraperMutation.data) {
    //         console.log(eventScraperMutation)
    //     }
    // }, [eventScraperMutation.data])

    return (
        <div className="w-full">
            <h1 className="mb-5">Event Scraper</h1>
            <Formik
                initialValues={initialValues}
                // validate={(values) => {
                // const errors: any = {}
                // if (!values.email) {
                //     errors.email = "Required"
                // } else if (
                //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                //         values.email
                //     )
                // ) {
                //     errors.email = "Invalid email address"
                // }
                // return errors
                // }}
                onSubmit={async (values) => {
                    try {
                        const { venueId } = values
                        if (venueId) {
                            eventScraperMutation.mutate({
                                venueId
                            })
                        }
                    } catch (error) {
                        // display error
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form className="flex flex-col">
                        <Select
                            name="venueId"
                            label="Select a venue to scrape"
                            optionData={venues}
                        />
                        <div>
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
