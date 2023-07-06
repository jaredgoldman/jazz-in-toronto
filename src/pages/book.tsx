import RootLayout from "~/layouts/RootLayout"
import EventForm from "~/components/Forms/Event"

export default function Book(): JSX.Element {
    return (
        <RootLayout>
            <main className="w-full flex justify-center">
                <EventForm />
            </main>
        </RootLayout>
    )
}
