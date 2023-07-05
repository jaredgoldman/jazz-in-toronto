import { Form, Formik, Field, ErrorMessage } from "formik"
import { api } from "~/utils/api"
import PlacesAutocomplete from "../Fields/PlacesAutoComplete"
import { Input } from "../Fields"

export interface Values {
    name: string
    location: {
        address: string
        latitude: number
        longitude: number
        city: string
    }
    instagramHandle?: string
    website?: string
}

export default function VenueForm(): JSX.Element {
    const venueMutation = api.venue.create.useMutation()

    return (
        <div>
            <h1 className="mb-5">Add your venue here!</h1>
            <Formik
                initialValues={{
                    name: "",
                    location: {
                        address: "",
                        latitude: 0,
                        longitude: 0,
                        city: ""
                    },
                    instagramHandle: "",
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
                        const { location, ...rest } = values
                        venueMutation.mutate({
                            ...rest,
                            ...location
                        })
                    } catch (error) {
                        // display error
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form className="flex w-2/5 flex-col">
                        <Input name="name" label="Venue Name" />
                        <PlacesAutocomplete name="location" label="Address" />
                        <Input name="instagramHandle" label="instagramHandle" />
                        <Input name="website" label="Venue Website" />
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
