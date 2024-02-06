import RootLayout from '~/layouts/RootLayout'
import EventForm from '~/components/Forms/Event'
import { Flex } from '@radix-ui/themes'

export default function Book(): JSX.Element {
    return (
        <RootLayout pageTitle="Jazz In Toronto | Book Your Event">
            <Flex justify="center" py="9" px={{ initial: '5', xs: '0' }}>
                <EventForm />
            </Flex>
        </RootLayout>
    )
}
