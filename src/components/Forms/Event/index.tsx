import * as Form from '@radix-ui/react-form'
import { Input, Toggle } from '../Fields'
import { Flex, Button, Heading, Box, Callout } from '@radix-ui/themes'
import useEventForm from './hooks/useEventForm'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import Link from '~/components/Link'
import { useRouter } from 'next/router'
import Loading from '~/components/Loading'
import FuzzySearchDropdownInput from '../Fields/FuzzySearchDropdownInput'

export default function EventForm() {
    const router = useRouter()
    const param = router.query.id as string
    const isAdmin = router.asPath.includes('admin')

    const {
        submit,
        errors,
        control,
        venueData,
        artistData,
        isSubmitting,
        hasSubmitted
    } = useEventForm(param, isAdmin)

    return (
        <Flex
            direction="column"
            align="center"
            py="6"
            width="100%"
            className="min-h-[30rem] max-w-xl"
        >
            {artistData && venueData ? (
                <Box className="w-full max-w-xl">
                    <Heading
                        size={{ initial: '8', xs: '9' }}
                        align={{ initial: 'center', xs: 'left' }}
                        mb="6"
                    >
                        {isAdmin ? 'Edit Event' : 'Submit your gig/event'}
                    </Heading>
                    {isAdmin ?? (
                        <Callout.Root my="6">
                            <Callout.Icon>
                                <InfoCircledIcon />
                            </Callout.Icon>
                            <Callout.Text>
                                Submit your gig here and at least 24hrs in
                                advance so our admins have time to review and
                                approve your listing. Once your gig is approved,
                                it will appear in the{' '}
                                <Link href="/listings">listings</Link> section
                            </Callout.Text>
                        </Callout.Root>
                    )}
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
                            <Box>
                                <FuzzySearchDropdownInput
                                    label="Select an venue"
                                    items={venueData}
                                    name="venueId"
                                    control={control}
                                    error={errors.venueId}
                                />
                                <Link
                                    size="2"
                                    href={isAdmin ? '/admin/venue' : '/venue'}
                                >
                                    or submit your venue
                                </Link>
                            </Box>
                            <Box>
                                <FuzzySearchDropdownInput
                                    label="Select an artist"
                                    items={artistData}
                                    name="artistId"
                                    control={control}
                                    error={errors.artistId}
                                />
                                <Link
                                    size="2"
                                    href={isAdmin ? '/admin/artist' : '/artist'}
                                >
                                    or add an artist
                                </Link>
                            </Box>
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
                            <Input
                                name="description"
                                label="Description"
                                type="textarea"
                                error={errors.description}
                                control={control}
                            />
                            {isAdmin ? (
                                <Toggle
                                    label="Auto-approve"
                                    name="approved"
                                    control={control}
                                    error={errors.approved}
                                />
                            ) : null}
                            <Form.Submit asChild>
                                <Button
                                    className="w-full"
                                    variant="solid"
                                    disabled={isSubmitting || hasSubmitted}
                                >
                                    Submit
                                </Button>
                            </Form.Submit>
                        </Flex>
                    </Form.Root>
                </Box>
            ) : (
                <Loading />
            )}
        </Flex>
    )
}
