import { Form, Formik } from "formik"
import { api } from "~/utils/api"
import { DatePicker, Input, Select } from "../Fields"
import { ModalForms } from "~/components/Modal/types"
import Button from "~/components/Button"

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

    return (
        <div className="w-full">
            <h1 className="mb-5">Book your gig here!</h1>
            <Formik
                initialValues={{
                    name: "",
                    startDate: new Date(),
                    endDate: new Date(),
                    bandId: "",
                    instagramHandle: "",
                    website: "",
                    venueId: ""
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
                    <Form className="flex flex-col">
                        <Input name="name" label="Event Name" />
                        {venueData && (
                            <Select
                                name="venueId"
                                label="Venue"
                                optionData={venueData}
                                modalForm={ModalForms.Venue}
                            />
                        )}
                        {bandData && (
                            <Select
                                name="bandId"
                                label="Band"
                                optionData={bandData}
                                modalForm={ModalForms.Band}
                            />
                        )}
                        <DatePicker name="startDate" label="Start Date" />
                        <DatePicker name="endDate" label="Start Date" />
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
