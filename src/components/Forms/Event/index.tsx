// Components
import * as Form from '@radix-ui/react-form'
import { DatePicker, Input, Select } from '../Fields'
import { Flex, Text, Button } from '@radix-ui/themes'
import FormLayout from '~/layouts/FormLayout'
import Dialogue from '~/components/Dialogue'
import VenueForm from '../Venue'
import ArtistForm from '../Artist'
// Types
import { type BaseSyntheticEvent } from 'react'
import type { Venue, Artist } from '~/types/data'
import type { Control, FieldErrors } from 'react-hook-form'
import { type EventFormValues } from './hooks/useEventForm'
// Hooks
import useArtistForm from '../Artist/hooks/useArtistForm'
import useVenueForm from '../Venue/hooks/useVenueForm'

interface Props {
    eventMutationIsSuccess: boolean
    editEventMutationIsSuccess: boolean
    artistData: Artist[] | undefined
    venueData: Venue[] | undefined
    isLoading: boolean
    control: Control<EventFormValues>
    errors: FieldErrors<EventFormValues>
    error?: string
    showSubmitButton?: boolean
    submit: (e: BaseSyntheticEvent) => Promise<void>
    onAddArtist: (data: Artist) => Promise<void>
    onAddVenue: (data: Venue) => Promise<void>
}

export default function EventForm({
    eventMutationIsSuccess,
    editEventMutationIsSuccess,
    venueData,
    artistData,
    error,
    errors,
    submit,
    isLoading,
    control,
    showSubmitButton = true,
    onAddArtist,
    onAddVenue
}: Props): JSX.Element {
    const artistFormProps = useArtistForm(undefined, onAddArtist)
    const venueFormProps = useVenueForm(undefined, onAddVenue)

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
                                onSubmit={venueFormProps.submit}
                                component={
                                    <VenueForm
                                        {...venueFormProps}
                                        showSubmitButton={false}
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
                                onSubmit={artistFormProps.submit}
                                component={
                                    <ArtistForm
                                        {...artistFormProps}
                                        showSubmitButton={false}
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
                    {eventMutationIsSuccess && (
                        <Text size="2" color="green" align="center">
                            Event submitted succesfully
                        </Text>
                    )}
                    {editEventMutationIsSuccess && (
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
                {showSubmitButton && (
                    <Flex width="100%" justify="center" mt="3">
                        <Form.Submit asChild>
                            <Button>Submit</Button>
                        </Form.Submit>
                    </Flex>
                )}
            </Form.Root>
        </FormLayout>
    )
}
