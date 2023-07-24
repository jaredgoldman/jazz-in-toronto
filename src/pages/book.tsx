// Components
import RootLayout from '~/layouts/RootLayout'
import EventForm from '~/components/Forms/Event'

export default function Book(): JSX.Element {
    return (
        <RootLayout>
            <main className="flex w-full justify-center">
                <EventForm />
            </main>
        </RootLayout>
    )
}
