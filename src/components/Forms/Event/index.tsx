import { useContext } from "react"
import { ModalContext } from "~/components/Modal/context/ModalContext"
import { Form, Formik, Field, ErrorMessage } from "formik"
import DatePickerField from "../Fields/DatePicker"
import { api } from "~/utils/api"
import { ModalForms } from "~/components/Modal/types"
import { DatePicker, Input, Select } from "../Fields"

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

    const mappedVenueData = venueData?.map((venue) => ({
        label: venue.name,
        value: venue.id
    }))
    const mappedBandData = bandData?.map((band) => ({
        label: band.name,
        value: band.id
    }))

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
                        console.log("EVENT SUBMIT VALUES:", values)
                        eventMutation.mutate(values)
                    } catch (error) {
                        // display error
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form className="flex w-2/5 flex-col">
                        <Input name="name" label="Event Name" />
                        <Select
                            name="venueId"
                            label="Venue"
                            options={mappedVenueData}
                        />
                        <Select
                            name="bandId"
                            label="Band"
                            options={mappedBandData}
                        />
                        <DatePicker name="startDate" label="Start Date" />
                        <DatePicker name="endDate" label="Start Date" />
                        <Input
                            name="instagramHandle"
                            label="Instagram Handle"
                        />
                        <Input name="website" label="Website" />
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
