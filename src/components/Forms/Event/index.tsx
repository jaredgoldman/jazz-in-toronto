import * as Form from '@radix-ui/react-form'
import { Input, Select, Toggle } from '../Fields'
import { Flex, Text, Button, Heading, Box, Callout } from '@radix-ui/themes'
import { BaseSyntheticEvent } from 'react'
import type { Venue, Artist } from '~/types/data'
import type { Control, FieldErrors } from 'react-hook-form'
import { EventFormValues } from './hooks/useEventForm'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import Link from '~/components/Link'

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
    showSubmitButton = true
}: Props): JSX.Element {
    return (
        <Flex direction="column" align="center" py="9">
            <Box className="w-full max-w-xl">
                <Heading size="9" mb="6">
                    Book Your Gig
                </Heading>
                <Callout.Root my="6">
                    <Callout.Icon>
                        <InfoCircledIcon />
                    </Callout.Icon>
                    <Callout.Text>
                        Submit your gig here and at least 24hrs in advance so
                        our admins have time to review and approve your listing.
                        Once your gig is approved, it will appear in the{' '}
                        <Link href="/listings">listings</Link> section
                    </Callout.Text>
                </Callout.Root>
                <Form.Root onSubmit={submit}>
                    <Flex direction="column" gap="5">
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
                            <Box>
                                <Select
                                    name="venueId"
                                    label="Select a venue"
                                    optionData={venueData}
                                    control={control}
                                    error={errors.venueId}
                                />
                                <Link size="2" href="/venue">
                                    or submit your venue
                                </Link>
                            </Box>
                        )}
                        {artistData && (
                            <Box>
                                <Select
                                    name="artistId"
                                    label="Select an artist"
                                    optionData={artistData}
                                    control={control}
                                    error={errors.artistId}
                                    required="Please select an artist for your event"
                                />
                                <Link size="2" href="/artist">
                                    or submit your band
                                </Link>
                            </Box>
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
                        <Flex width="100%" justify="center" mt="5">
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
