import * as Form from '@radix-ui/react-form'
import { Input, Select } from '../Fields'
import { Flex, Button, Heading, Box, Callout } from '@radix-ui/themes'
import useEventForm, { toDateTimeLocal } from './hooks/useEventForm'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import Link from '~/components/Link'
import { useRouter } from 'next/router'
import { api } from '~/utils/api'
import { useEffect } from 'react'
import { EventWithArtistVenue } from '~/types/data'
import Loading from '~/components/Loading'

export default function EventForm(): JSX.Element {
    const router = useRouter()
    const param = router.query.id as string
    const isAdmin = router.asPath.includes('admin')
    const { data } = api.event.get.useQuery(
        { id: param },
        { enabled: Boolean(param), staleTime: Infinity, cacheTime: Infinity }
    )

    const { submit, errors, control, venueData, artistData, reset } =
        useEventForm(param)

    useEffect(() => {
        if (data) {
            delete (data as Partial<EventWithArtistVenue>).id
            reset({
                ...data,
                instagramHandle: data.instagramHandle ?? '',
                website: data.website ?? '',
                description: data.description ?? '',
                startDate: toDateTimeLocal(data.startDate),
                endDate: toDateTimeLocal(data.endDate),
                artistId: data.artistId,
                venueId: data.venueId
            })
        }
    }, [data, reset])

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
                        {isAdmin ? 'Edit Event' : 'Submit Event'}
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
                            {isAdmin && (
                                <Input
                                    name="description"
                                    label="Featured description"
                                    type="textarea"
                                    error={errors.description}
                                    control={control}
                                />
                            )}
                            <Form.Submit asChild>
                                <Button className="w-full" variant="solid">
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
