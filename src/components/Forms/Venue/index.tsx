import { Form, Formik } from 'formik'
import { api } from '~/utils/api'
import PlacesAutocomplete from '../Fields/PlacesAutoComplete'
import { Input } from '../Fields'
import Button from '~/components/Button'

export interface Values {
    name: string
    address: string
    latitude: number
    longitude: number
    city: string
    instagramHandle?: string
    website?: string
}

interface Props {
    currentValues?: Values
}

export default function VenueForm({ currentValues }: Props): JSX.Element {
    const venueMutation = api.venue.create.useMutation()

    const initialValues = currentValues
        ? currentValues
        : {
              name: '',
              address: '',
              latitude: 0,
              longitude: 0,
              city: '',
              instagramHandle: '',
              website: ''
          }

    return (
        <div>
            <h1 className="mb-5">Add your venue here!</h1>
            <Formik
                initialValues={initialValues}
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
                        venueMutation.mutate(values)
                    } catch (error) {
                        // display error
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form className="flex flex-col">
                        <Input name="name" label="Venue Name" />
                        <PlacesAutocomplete name="location" label="Address" />
                        <Input name="instagramHandle" label="instagramHandle" />
                        <Input name="website" label="Venue Website" />
                        <Button type="submit" disabled={isSubmitting}>
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
