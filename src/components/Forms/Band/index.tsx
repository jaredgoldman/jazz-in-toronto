import { Form, Formik, Field, ErrorMessage } from "formik"
import { api } from "~/utils/api"

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
        <div>
            <h1 className="mb-5">Book your gig here!</h1>
            <Formik
                initialValues={{
                    name: "",
                    genre: "",
                    instagramHandle: "",
                    website: "",
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
                    <Form className="flex w-2/5 flex-col">
                        <label>Name</label>
                        <Field
                            className="mb-5 border-2 border-black"
                            type="text"
                            name="name"
                        />
                        <ErrorMessage name="name" component="div" />
                        <label>Genre</label>
                        <Field
                            className="mb-5 border-2 border-black"
                            type="text"
                            name="genre"
                        />
                        <ErrorMessage name="genre" component="div" />
                        <label>Instagram</label>
                        <Field
                            className="mb-5 border-2 border-black"
                            type="text"
                            name="instagramHandle"
                        />
                        <ErrorMessage name="instagramHandle" component="div" />
                        <label>Website</label>
                        <Field
                            className="mb-5 border-2 border-black"
                            type="text"
                            name="website"
                        />
                        <ErrorMessage name="website" component="div" />
                        <div>
                            <button type="submit" disabled={isSubmitting}>
                                Submit
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
