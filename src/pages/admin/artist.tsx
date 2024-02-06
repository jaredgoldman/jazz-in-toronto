import ArtistForm from '~/components/Forms/Artist'
import { Flex } from '@radix-ui/themes'
import AdminLayout from '~/layouts/AdminLayout'

export default function EditArtist() {
    return (
        <AdminLayout
            pageTitle="Jazz in Toronto | Edit Artist"
            breadcrumbs={{
                href: '/admin/artists',
                title: 'Artists',
                currentPageTitle: 'Edit Artist'
            }}
        >
            <Flex justify="center" px={{ initial: '5', xs: '0' }} py="2">
                <ArtistForm />
            </Flex>
        </AdminLayout>
    )
}
