// Components
import RootLayout from '~/layouts/RootLayout'
import Calendar from '~/components/Calendar'

export default function Listings(): JSX.Element {
    return (
        <RootLayout pageTitle='Jazz In Toronto | Event Listings'>
            <Calendar />
        </RootLayout>
    )
}
