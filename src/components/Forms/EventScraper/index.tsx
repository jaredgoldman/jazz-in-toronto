// Components
import { Formik, Form } from 'formik'
import { Select } from '../Fields'
import Button from '~/components/Button'
// Types
import { type Venue } from '~/types/data'
// Utils
import { api } from '~/utils/api'

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
                validate={(values) => {
                    const errors: any = {}
                    if (!values.venueId) {
                        errors.venueId = 'Required'
                    }
                    return errors
                }}
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
