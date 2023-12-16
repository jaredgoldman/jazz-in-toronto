import RootLayout from '~/layouts/RootLayout'
import EventForm from '~/components/Forms/Event'
import useEventForm from '~/components/Forms/Event/hooks/useEventForm'
import { Flex } from '@radix-ui/themes'

export default function Book(): JSX.Element {
    const eventFormProps = useEventForm()

    return (
        <RootLayout pageTitle="Jazz In Toronto | Book Your Event">
            <Flex justify="center" py="6" px={{ initial: '5', xs: '0' }} mb="6">
                <EventForm {...eventFormProps} />
            </Flex>
        </RootLayout>
    )
}
