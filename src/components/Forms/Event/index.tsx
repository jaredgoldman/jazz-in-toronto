import * as Form from '@radix-ui/react-form'
import { Input, Select, Toggle } from '../Fields'
import { Flex, Text, Button, Heading, Box, Callout } from '@radix-ui/themes'
import Dialogue from '~/components/Dialogue'
import VenueForm from '../Venue'
import ArtistForm from '../Artist'
import { BaseSyntheticEvent } from 'react'
import type { Venue, Artist } from '~/types/data'
import type { Control, FieldErrors } from 'react-hook-form'
import { EventFormValues } from './hooks/useEventForm'
import useArtistForm from '../Artist/hooks/useArtistForm'
import useVenueForm from '../Venue/hooks/useVenueForm'
import { InfoCircledIcon } from '@radix-ui/react-icons'

interface Props {
    eventMutationIsSuccess: boolean
    editEventMutationIsSuccess: boolean
    artistData: Artist[] | undefined
    venueData: Venue[] | undefined
    isLoading: boolean
    control: Control<EventFormValues>
    errors: FieldErrors<EventFormValues>
    isEditing: boolean
    error?: string
    showSubmitButton?: boolean
    submit: (e: BaseSyntheticEvent) => Promise<void>
    onAddArtist: (data: Artist) => Promise<void>
    onAddVenue: (data: Venue) => Promise<void>
}

export default function EventForm({
    eventMutationIsSuccess,
    editEventMutationIsSuccess,
    artistData,
    venueData,
    control,
    errors,
    isEditing,
    error,
    submit,
    showSubmitButton = true,
    onAddArtist,
    onAddVenue
}: Props): JSX.Element {
    const artistFormProps = useArtistForm(undefined, onAddArtist)
    const venueFormProps = useVenueForm(undefined, onAddVenue)

    return (
        <Flex direction="column" align="center" p="5">
            <Box className="w-full max-w-2xl">
                <Heading size="9" mb="6">
                    Book Your Gig
                </Heading>
                <Callout.Root mb="5">
                    <Callout.Icon>
                        <InfoCircledIcon />
                    </Callout.Icon>
                    <Callout.Text>
                        Submit your gig here and at least 24hrs in advance so
                        our admins have time to review and approve your listing.
                        Once your gig is approved, it will appear in the
                        listings section
                    </Callout.Text>
                </Callout.Root>
                <Form.Root onSubmit={submit}>
                    <Flex direction="column" gap="4">
                        <Input
                            name="name"
                            label="Enter the name of your event"
                            type="text"
                            error={errors.name}
                            control={control}
                            required="You must enter a name for your event"
                        />
                        <Input
                            label="Event start date"
                            name="startDate"
                            error={errors.startDate}
                            control={control}
                            required="Please select a valid start time for your event"
                            type="datetime-local"
                        />
                        <Input
                            label="Event end date"
                            name="endDate"
                            error={errors.endDate}
                            control={control}
                            required="Please select a valid end time for your event"
                            type="datetime-local"
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
                                    triggerLabel="Add your venue"
                                    onSubmit={venueFormProps.submit}
                                    triggerButtonVariant="outline"
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
                                    triggerLabel="Add your band"
                                    onSubmit={artistFormProps.submit}
                                    triggerButtonVariant="outline"
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
                        {isEditing && (
                            <Toggle
                                label="Featured"
                                name="featured"
                                control={control}
                                error={errors.featured}
                            />
                        )}
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
                                <Button className="w-full" variant="solid">
                                    Submit
                                </Button>
                            </Form.Submit>
                        </Flex>
                    )}
                </Form.Root>
            </Box>
        </Flex>
    )
}
