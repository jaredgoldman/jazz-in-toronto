import RootLayout from "~/layouts/RootLayout"
import BookingForm from "~/components/BookingForm"
export default function Book(): JSX.Element {
    return (
        <RootLayout>
            <main>
                <BookingForm />
            </main>
        </RootLayout>
    )
}
