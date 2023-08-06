// Libraries
import { useState, useRef, useEffect } from 'react'
// Components
import { Form, Formik } from 'formik'
import { DatePicker, Input, Select } from '../Fields'
import { ModalForms } from '~/components/Modal/types'
import Button from '~/components/Button'
import FormLayout from '~/layouts/FormLayout'
// Types
import { type FormikContextType } from 'formik'
import { type EventWithBandVenue } from '~/types/data'
// Utils
import { api } from '~/utils/api'

export interface Values {
    name: string
    startDate: Date
    endDate: Date
    bandId: string
    instagramHandle?: string
    website?: string
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
    const formikRef = useRef<FormikContextType<Values>>(null)
    const { data: venueData } = api.venue.getAll.useQuery()
    const { data: bandData } = api.band.getAll.useQuery()

    const eventMutation = api.event.create.useMutation()

    useEffect(() => {
        if (eventMutation.isSuccess && formikRef.current) {
            formikRef.current?.setSubmitting(false)
        }
    }, [eventMutation.isSuccess, formikRef])

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
                innerRef={formikRef}
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
                    eventMutation.mutate(values)
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
                        <Input
                            className="flex flex-col"
                            name="website"
                            label="Website"
                        />
                        <div className="flex w-full flex-col items-center">
                            <div className="flex h-10 flex-col justify-center text-sm">
                                {eventMutation.isError && (
                                    <p className="text-red-500">
                                        There was an error submitting. Please
                                        try again
                                    </p>
                                )}
                                {eventMutation.isSuccess && (
                                    <p className="text-green-500">
                                        Event submitted successfully!
                                    </p>
                                )}
                            </div>
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                isLoading={isSubmitting}
                            >
                                Submit
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </FormLayout>
    )
}
