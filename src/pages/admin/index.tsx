// Components
import AdminLayout from '~/layouts/AdminLayout'
import LoginForm from '~/components/Forms/Login'
export default function AdminHome() {
    return (
        <AdminLayout>
            <LoginForm />
        </AdminLayout>
    )
}
