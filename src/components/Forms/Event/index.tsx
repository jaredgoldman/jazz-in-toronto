// Libraries
import { useRef, forwardRef, useImperativeHandle, type Ref } from 'react'
// Components
import * as Form from '@radix-ui/react-form'
import { DatePicker, Input, Select } from '../Fields'
import { Flex, Text, Button } from '@radix-ui/themes'
import FormLayout from '~/layouts/FormLayout'
import Dialogue from '~/components/Dialogue'
import VenueForm from '../Venue'
import ArtistForm from '../Artist'
// Types
import { type EventWithArtistVenue } from '~/types/data'
// Hooks
import useEventForm, { type EventFormValues } from './hooks/useEventForm'

interface Props {
    currentValues?: EventWithArtistVenue
    externalSubmit?: boolean
    externalOnSubmit?: (values: EventFormValues) => void
}

interface InnerFormRef {
    submitForm: () => Promise<void>
}

export default forwardRef(function EventForm(
    {
        currentValues,
        externalSubmit = false,
        externalOnSubmit = undefined
    }: Props,
    ref: Ref<unknown> | undefined
): JSX.Element {
    const venueFormRef = useRef<InnerFormRef | null>(null)
    const bandFormRef = useRef<InnerFormRef | null>(null)
    const {
        eventMutation,
        editEventMutation,
        venueData,
        artistData,
        error,
        errors,
        submit,
        isLoading,
        control,
        onAddArtist,
        onAddVenue
    } = useEventForm(currentValues, externalOnSubmit)

    /*
     * useImperative handle helps reference methods
     * in a sibling or parents components
     * helpful for nested forms like this one
     */
    useImperativeHandle(ref, () => ({
        submitForm: submit
    }))

    return (
        <FormLayout maxWidth="max-w-md" isLoading={isLoading}>
            <Form.Root onSubmit={submit}>
                <Flex direction="column" gap="3">
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
                        datePickerProps={{
                            showTimeSelect: true,
                            dateFormat: 'MMMM d, yyyy h:mm aa'
                        }}
                    />
                    <DatePicker<EventFormValues>
                        label="Event end date"
                        name="endDate"
                        error={errors.endDate}
                        control={control}
                        required="Please select a valid end time for your event"
                        datePickerProps={{
                            showTimeSelect: true,
                            dateFormat: 'MMMM d, yyyy h:mm aa'
                        }}
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
                    {artistData && (
                        <>
                            <Select
                                name="artistId"
                                label="Select a band"
                                optionData={artistData}
                                control={control}
                                error={errors.artistId}
                                required="Please select a band for your event"
                            />
                            <Dialogue
                                title="Add your band"
                                triggerLabel="Add your band"
                                formRef={bandFormRef}
                                component={
                                    <ArtistForm
                                        ref={bandFormRef}
                                        onAdd={onAddArtist}
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
                </Flex>
                <Flex width="100%" justify="center" mt="3">
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
