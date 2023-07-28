import Link from 'next/link'
import Button from '~/components/Button'
import AdminLayout from '~/layouts/AdminLayout'

export default function AdminHome() {
    return (
        <AdminLayout showHeaderLinks={false}>
            <>
                <Link href="admin/events">
                    <Button>Events</Button>
                </Link>
                <Link href="admin/bands">
                    <Button>Bands</Button>
                </Link>
                <Link href="admin/venues">
                    <Button>Venues</Button>
                </Link>
            </>
        </AdminLayout>
    )
}
