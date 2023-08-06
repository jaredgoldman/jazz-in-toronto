// Components
import { Form, Formik } from 'formik'
import { DatePicker, Input, Select } from '../Fields'
import { ModalForms } from '~/components/Modal/types'
import Button from '~/components/Button'
import FormLayout from '~/layouts/FormLayout'
// Types
import { type EventWithBandVenue } from '~/types/data'
// Utils
import { api } from '~/utils/api'

export interface Values {
    name: string
    startDate: Date
    endDate: Date
    bandId: string
    instagramHandle: string
    website: string
    venueId: string
}

interface Errors {
    name?: string
    startDate?: string
    endDate?: string
    bandId?: string
    instagramHandle?: string
    website?: string
    venueId?: string
}

interface Props {
    currentValues?: EventWithBandVenue
}
export default function EventForm({ currentValues }: Props): JSX.Element {
    const { data: venueData } = api.venue.getAll.useQuery()
    const { data: bandData } = api.band.getAll.useQuery()

    const eventMutation = api.event.create.useMutation()

    const initialValues = currentValues
        ? {
              ...currentValues,
              instagramHandle: currentValues.instagramHandle || undefined,
              website: currentValues.website || undefined
          }
        : {
              name: '',
              startDate: new Date(),
              endDate: new Date(),
              bandId: '',
              venueId: '',
              instagramHandle: '',
              website: ''
          }

    return (
        <FormLayout>
            <h1 className="text-bold mb-5 text-center">
                {currentValues ? 'Edit gig' : 'Add your gig here!'}
            </h1>
            <Formik
                initialValues={initialValues}
                validate={(values) => {
                    const errors: Errors = {}
                    if (!values.name) {
                        errors.name = 'Required'
                    }
                    if (!values.venueId) {
                        errors.venueId = 'Required'
                    }
                    if (!values.bandId) {
                        errors.bandId = 'Required'
                    }
                    if (!values.startDate) {
                        errors.startDate = 'Required'
                    }
                    if (!values.endDate) {
                        errors.endDate = 'Required'
                    }

                    return errors
                }}
                onSubmit={(values) => {
                    try {
                        eventMutation.mutate(values)
                    } catch (error) {
                        // display error
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form className="flex flex-col">
                        <Input name="name" label="Event Name" />
                        {venueData && (
                            <Select
                                name="venueId"
                                label="Venue"
                                optionData={venueData}
                                modalForm={ModalForms.Venue}
                            />
                        )}
                        {bandData && (
                            <Select
                                name="bandId"
                                label="Band"
                                optionData={bandData}
                                modalForm={ModalForms.Band}
                            />
                        )}
                        <DatePicker
                            name="startDate"
                            label="Start Date"
                            datePickerProps={{
                                showTimeSelect: true
                            }}
                        />
                        <DatePicker
                            name="endDate"
                            label="End Date"
                            datePickerProps={{
                                showTimeSelect: true
                            }}
                        />
                        <Input
                            name="instagramHandle"
                            label="Instagram Handle"
                        />
                        <Input name="website" label="Website" />
                        <div className="mt-5 flex w-full justify-center">
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
