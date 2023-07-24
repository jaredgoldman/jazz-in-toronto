// Components
import { Form, Formik } from 'formik'
import { Input } from '../Fields'
import Button from '~/components/Button'

export interface Values {
    email: string
    password: string
}

export default function LoginForm(): JSX.Element {
    return (
        <div className="w-full">
            <h1 className="mb-5">Login to the admin panel</h1>
            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                validate={(values) => {
                    const errors: any = {}
                    if (!values.email) {
                        errors.email = 'Required'
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                            values.email
                        )
                    ) {
                        errors.email = 'Invalid email address'
                    }
                    if (!values.password) {
                        errors.password = 'Required'
                    }
                    return errors
                }}
                onSubmit={async (values) => {
                    try {
                        // bandMutation.mutate(values)
                    } catch (error) {
                        // display error
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form className="flex flex-col">
                        <Input name="email" label="Email" />
                        <Input name="password" label="Password" />
                        <div>
                            <Button type="submit" disabled={isSubmitting}>
                                Submit
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
