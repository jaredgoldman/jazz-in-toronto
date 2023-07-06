import RootLayout from "~/layouts/RootLayout"
import VenueForm from "~/components/Forms/Venue"

export default function Book(): JSX.Element {
    return (
        <RootLayout>
            <main className="w-full flex justify-center">
                <VenueForm />
            </main>
        </RootLayout>
    )
}
