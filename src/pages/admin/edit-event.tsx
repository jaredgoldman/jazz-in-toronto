import VenueForm from '~/components/Forms/Venue'
import RootLayout from '~/layouts/RootLayout'

export default function EditVenue() {
    return (
        <RootLayout pageTitle="Jazz in Toronto | Edit Artist">
            <VenueForm />
        </RootLayout>
    )
}
