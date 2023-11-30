// Components
import RootLayout from '~/layouts/RootLayout'
import Calendar from '~/components/Calendar'
import RecurringGigs from '~/components/RecurringGigs'
import { Heading } from '@radix-ui/themes'

export default function Listings() {
    return (
        <RootLayout pageTitle="Jazz In Toronto | Event Listings">
            <Heading size="9" align="center" mb="9">
                Listings
            </Heading>
            <Calendar />
            <Heading size="9" align="center" mb="9">
                Recurring Gigs
            </Heading>
            <RecurringGigs />
        </RootLayout>
    )
}
