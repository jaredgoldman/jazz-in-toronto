import { useContext} from "react"
import { ModalContext } from "~/components/Modal/context/ModalContext"
import { Form, Formik, Field, ErrorMessage } from "formik"
import DatePickerField from "../Fields/DatePicker"
import { api } from "~/utils/api"

export interface Values {
    name: string
    startDate: Date
    endDate: Date
    bandId: string
    photoPath: string
    instagramHandle: string
    website: string
    venueId: string
}

export default function EventForm(): JSX.Element {
    const { data: venueData } = api.venue.getAll.useQuery()
    const { data: bandData } = api.band.getAll.useQuery()
    const eventMutation = api.event.create.useMutation()
    const { handleModal } = useContext(ModalContext)
    return (
        <div>
            <h1 className="mb-5">Book your gig here!</h1>
            <Formik
                initialValues={{
                    name: "",
                    startDate: new Date(),
                    endDate: new Date(),
                    bandId: "",
                    instagramHandle: "",
                    website: "",
                    venueId: "",
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
                        eventMutation.mutate(values)
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
                        <label>Band</label>
                        <Field
                            className="mb-5 border-2 border-black"
                            component="select"
                            name="bandId"
                            as="select"
                        >
                            <option value="">Select a band</option>
                            {bandData?.map((band) => (
                                <option key={band.id} value={band.id}>
                                    {band.name}
                                </option>
                            ))}
                        </Field>
                        <ErrorMessage name="band" component="div" />
                        <label>Venue</label>
                        <Field
                            className="mb-5 border-2 border-black"
                            component="select"
                            name="venueId"
                            as="select"
                        >
                            <option value="">Select a venue</option>
                            {venueData?.map((venue) => (
                                <option key={venue.id} value={venue.id}>
                                    {venue.name}
                                </option>
                            ))}
                        </Field>
                        <ErrorMessage name="venue" component="div" />
                        <label>Start Date</label>
                        <Field
                            component={DatePickerField<Values>}
                            name="startDate"
                            className="mb-5 border-2 border-black"
                        />
                        <ErrorMessage name="startDate" component="div" />
                        <label>End Date</label>
                        <Field
                            component={DatePickerField<Values>}
                            name="endDate"
                            className="mb-5 border-2 border-black"
                        />
                        <ErrorMessage name="endDate" component="div" />
                        <label>Instagram Handle</label>
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
                        <div>
                            <button onClick={() => handleModal()}>Open Modal</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
