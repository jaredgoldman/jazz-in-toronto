// Components
import { useRef, forwardRef, useImperativeHandle } from 'react'
import * as Form from '@radix-ui/react-form'
import { DatePicker, Input, Select } from '../Fields'
import { Flex, Text, Button } from '@radix-ui/themes'
import FormLayout from '~/layouts/FormLayout'
// Types
import { type EventWithBandVenue } from '~/types/data'
// Hooks
import useEventForm, { EventFormValues } from './hooks/useEventForm'
import Dialogue from '~/components/Dialogue'
import VenueForm from '../Venue'
import BandForm from '../Band'

interface Props {
    currentValues?: EventWithBandVenue
    externalSubmit?: boolean
}

interface InnerFormRef {
    submitForm: () => Promise<void>
}

export default forwardRef(function EventForm(
    { currentValues, externalSubmit = false }: Props,
    ref: any
): JSX.Element {
    const venueFormRef = useRef<InnerFormRef | null>(null)
    const bandFormRef = useRef<InnerFormRef | null>(null)
    const {
        eventMutation,
        editEventMutation,
        venueData,
        bandData,
        error,
        errors,
        submit,
        isLoading,
        control,
        onAddBand,
        onAddVenue
    } = useEventForm(currentValues)

    useImperativeHandle(ref, () => ({
        submitForm: submit
    }))

    return (
        <FormLayout isLoading={isLoading}>
            <Form.Root onSubmit={submit}>
                <Input
                    name="name"
                    label="Enter the name of your event"
                    type="text"
                    error={errors.name}
                    control={control}
                    required="You must enter a name for your event"
                />
                <DatePicker<EventFormValues>
                    label="Event start date"
                    name="startDate"
                    error={errors.startDate}
                    control={control}
                    required="Please select a valid start time for your event"
                />
                <DatePicker<EventFormValues>
                    label="Event end date"
                    name="endDate"
                    error={errors.endDate}
                    control={control}
                    required="Please select a valid end time for your event"
                />
                {venueData && (
                    <>
                        <Select
                            name="venueId"
                            label="Select a venue"
                            optionData={venueData}
                            control={control}
                            error={errors.venueId}
                        />
                        <Dialogue
                            title="Add a venue"
                            triggerLabel="Add your venue"
                            description="Add your venue to our database"
                            formRef={venueFormRef}
                            component={
                                <VenueForm
                                    ref={venueFormRef}
                                    onAdd={onAddVenue}
                                    externalSubmit={true}
                                />
                            }
                        />
                    </>
                )}
                {bandData && (
                    <>
                        <Select
                            name="bandId"
                            label="Select a band"
                            optionData={bandData}
                            control={control}
                            error={errors.bandId}
                            required="Please select a band for your event"
                        />
                        <Dialogue
                            title="Add your band"
                            triggerLabel="Add your band"
                            description="Add your band to our database"
                            formRef={bandFormRef}
                            component={
                                <BandForm
                                    ref={bandFormRef}
                                    onAdd={onAddBand}
                                    externalSubmit={true}
                                />
                            }
                        />
                    </>
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
                        <Text size="2" color="green" align="center">
                            Event submitted succesfully
                        </Text>
                    )}
                    {editEventMutation.isSuccess && (
                        <Text size="2" color="green" align="center">
                            Event edited succesfully
                        </Text>
                    )}
                    {error && (
                        <Text size="2" color="red" align="center">
                            {error}
                        </Text>
                    )}
                </Flex>
                {!externalSubmit && (
                    <Flex width="100%" justify="center" mt="3">
                        <Form.Submit asChild>
                            <Button>Submit</Button>
                        </Form.Submit>
                    </Flex>
                )}
            </Form.Root>
        </FormLayout>
    )
})
