import VenueForm from '~/components/Forms/Venue'
import RootLayout from '~/layouts/RootLayout'

export default function Event() {
    return (
        <RootLayout pageTitle="Jazz In Toronto | Submit your venue">
            <VenueForm />
        </RootLayout>
    )
}
