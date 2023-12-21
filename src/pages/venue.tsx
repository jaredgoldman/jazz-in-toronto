import VenueForm from '~/components/Forms/Venue'
import RootLayout from '~/layouts/RootLayout'
import Link from '~/components/Link'
import { Text, Flex } from '@radix-ui/themes'

export default function Venue() {
    return (
        <RootLayout
            pageTitle="Jazz In Toronto | Submit your venue"
            calloutContent={
                <Text>
                    Submit your venue gig here and at least 24hrs in advance so
                    our admins have time to review and approve your listing.
                    Once your venue is approved, it will appear in the{' '}
                    <Link href="/venues">venues section</Link>
                </Text>
            }
        >
            <Flex justify="center" px={{ initial: '5', xs: '0' }} py="9">
                <VenueForm />
            </Flex>
        </RootLayout>
    )
}
