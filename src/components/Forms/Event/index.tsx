// Components
import * as Form from '@radix-ui/react-form'
import { DatePicker, Input, Select } from '../Fields'
import { Flex, Text } from '@radix-ui/themes'
import FormLayout from '~/layouts/FormLayout'
// Types
import { type EventWithBandVenue } from '~/types/data'
import { ModalForms } from '~/components/Modal/types'
// Hooks
import useEventForm, { EventFormValues } from './hooks/useEventForm'

interface Props {
    currentValues?: EventWithBandVenue
}

export default function EventForm({ currentValues }: Props): JSX.Element {
    const {
        eventMutation,
        editEventMutation,
        venueData,
        bandData,
        error,
        errors,
        submit,
        onAddVenue,
        onAddBand,
        added,
        isLoading,
        register,
        setValue,
        control
    } = useEventForm(currentValues)

    return (
        <FormLayout isLoading={isLoading}>
            <Form.Root onSubmit={submit}>
                <Input
                    name="name"
                    label="Enter the name of your event"
                    type="text"
                    error={errors.name}
                    control={control}
                />
                <DatePicker<EventFormValues>
                    label="Event start date"
                    name="startDate"
                    error={errors.startDate}
                    control={control}
                />
                <DatePicker<EventFormValues>
                    label="Event start date"
                    name="endDate"
                    error={errors.endDate}
                    control={control}
                />
                {venueData && (
                    <Select
                        name="venueId"
                        label="Select a venue"
                        optionData={venueData}
                        control={control}
                        modalForm={ModalForms.Venue}
                        error={errors.venueId}
                        onAdd={onAddVenue}
                        buttonText={
                            added.venue ? 'Venue added!' : 'Add a venue'
                        }
                    />
                )}
                {bandData && (
                    <Select
                        name="bandId"
                        label="Select a band"
                        optionData={bandData}
                        control={control}
                        modalForm={ModalForms.Band}
                        error={errors.bandId}
                        onAdd={onAddBand}
                        buttonText={added.band ? 'Band added!' : 'Add a band'}
                    />
                )}
                <Input
                    name="instagramHandle"
                    label="Enter your IG handle"
                    type="text"
                    error={errors.instagramHandle}
                    control={control}
                />
                <Input
                    name="website"
                    label="Enter a related website"
                    type="text"
                    error={errors.website}
                    control={control}
                />
                <Flex>
                    {eventMutation.isSuccess && (
                        <Text>Event submitted succesfully</Text>
                    )}
                    {editEventMutation.isSuccess && (
                        <Text>Event edited succesfully</Text>
                    )}
                    {error && <Text>{error}</Text>}
                </Flex>
                <Flex width="100%" justify="center">
                    <Form.Submit>Submit</Form.Submit>
                </Flex>
            </Form.Root>
        </FormLayout>
    )
}
