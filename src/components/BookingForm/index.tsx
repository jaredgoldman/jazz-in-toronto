import { Venue } from "@prisma/client"
import { Form, Formik, Field, ErrorMessage } from "formik"
import DatePickerField from "./DatePicker"
import { api } from "~/utils/api"

export interface Values {
    name: string
    startDate: string
    endDate: string
    bandId: string
    photoPath: string
    instagramHandle: string
    website: string
    venueId: string
}

interface Props {
    venues: Venue[]
}
export default function BookingForm(): JSX.Element {
    const { data, isLoading } = api.band.getAll.useQuery()
    console.log("query data: ", data)
    return (
        <div>
            <h1 className="mb-5">Book your gig here!</h1>
            <Formik
                initialValues={{
                    name: "",
                    startDate: "",
                    endDate: "",
                    bandId: "",
                    photoPath: "",
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
                onSubmit={(values, { setSubmitting }) => {
                    console.log(values)
                    setSubmitting(true)
                    return
                }}
            >
                {({ isSubmitting }) => (
                    <Form className="flex w-2/5 flex-col">
                        <label>Band Name</label>
                        <Field
                            className="mb-5 border-2 border-black"
                            type="text"
                            name="bandName"
                        />
                        <ErrorMessage name="bandName" component="div" />
                        <label>Start Date</label>
                        <Field
                            component={DatePickerField}
                            name="startDate"
                            className="mb-5 border-2 border-black"
                        />
                        <ErrorMessage name="startDate" component="div" />
                        <label>End Date</label>
                        <Field
                            component={DatePickerField}
                            name="endDate"
                            className="mb-5 border-2 border-black"
                        />
                        <ErrorMessage name="endDate" component="div" />
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
