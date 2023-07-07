import { Form, Formik } from "formik"
import { api } from "~/utils/api"
import { Input } from "../Fields"
import Button from "~/components/Button"

export interface Values {
    name: string
    genre?: string
    photoPath?: string
    instagramHandle?: string
    website?: string
}

export default function BandForm(): JSX.Element {
    const bandMutation = api.band.create.useMutation()
    return (
        <div className="w-full">
            <h1 className="mb-5">Add your band to our database</h1>
            <Formik
                initialValues={{
                    name: "",
                    instagramHandle: "",
                    genre: "",
                    website: ""
                }}
                // validate={(values) => {
                // const errors: any = {}
                // if (!values.email) {
                //     errors.email = "Required"
                // } else if (
                //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                //         values.email
                //     )
                // ) {
                //     errors.email = "Invalid email address"
                // }
                // return errors
                // }}
                onSubmit={async (values) => {
                    try {
                        bandMutation.mutate(values)
                    } catch (error) {
                        // display error
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form className="flex flex-col">
                        <Input name="name" label="Name" />
                        <Input name="genre" label="Musical genre" />
                        <Input
                            name="instagramHandle"
                            label="Instagram Handle"
                        />
                        <Input name="website" label="Website" />
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
