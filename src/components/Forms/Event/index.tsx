// Components
import { Form, Formik } from 'formik'
import { DatePicker, Input, Select } from '../Fields'
import { ModalForms } from '~/components/Modal/types'
import Button from '~/components/Button'
import FormLayout from '~/layouts/FormLayout'
// Types
import { type EventWithBandVenue } from '~/types/data'
// Hooks
import useEventForm from './hooks/useEventForm'

interface Props {
    currentValues?: EventWithBandVenue
}

export default function EventForm({ currentValues }: Props): JSX.Element {
    const {
        eventMutation,
        editEventMutation,
        venueData,
        bandData,
        initialValues,
        error,
        isEditing,
        onSubmit,
        validate,
        onAddVenue,
        onAddBand,
        added,
        formikRef
    } = useEventForm(currentValues)

    return (
        <FormLayout>
            <h1 className="text-bold mb-5 text-center">
                {currentValues ? 'Edit gig' : 'Add your gig here!'}
            </h1>
            <Formik
                initialValues={initialValues}
                validate={validate}
                onSubmit={onSubmit}
                innerRef={formikRef}
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
                                onAdd={onAddVenue}
                                buttonText={
                                    added.venue ? 'Venue added!' : 'Add a venue'
                                }
                                buttonDisabled={added.venue}
                            />
                        )}
                        {bandData && (
                            <Select
                                name="bandId"
                                label="Band"
                                optionData={bandData}
                                modalForm={ModalForms.Band}
                                onAdd={onAddBand}
                                buttonText={
                                    added.band ? 'Band added!' : 'Add a band'
                                }
                                buttonDisabled={added.band}
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
                            <div className="flex h-10 flex-col justify-center text-sm text-red-500">
                                {error && (
                                    <p className="text-red-500">{error}</p>
                                )}
                                {eventMutation.isSuccess ||
                                    (editEventMutation.isSuccess && (
                                        <p className="text-green-500">
                                            {`Event ${
                                                isEditing ? 'edited' : 'added'
                                            } successfully!`}
                                        </p>
                                    ))}
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
