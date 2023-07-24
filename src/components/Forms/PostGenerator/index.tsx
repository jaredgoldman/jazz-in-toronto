import { useState } from 'react'
import Button from '~/components/Button'
import { api } from '~/utils/api'
import { Formik, Form } from 'formik'
import { DatePicker } from '../Fields'
import { useEffect } from 'react'

// interface Props {
//     venues: Venue[]
// }

export default function PostGenerator(): JSX.Element {
    const [postImages, setPostImages] = useState<string[]>([])
    const postMutation = api.event.post.useMutation()

    const initialValues = {
        date: new Date()
    }

    useEffect(() => {
        if (postMutation.data) {
            setPostImages(postMutation.data)
        }
    }, [postMutation.data])

    return (
        <div className="w-full">
            <h1 className="mb-5">Event Scraper</h1>
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
                        postMutation.mutate(values)
                    } catch (error) {
                        // display error
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form className="flex flex-col">
                        <DatePicker
                            label="Select a day to generate a post for"
                            name="date"
                            showTimeSelect={false}
                        />

                        <div>
                            <Button type="submit" disabled={isSubmitting}>
                                Submit
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
            <>
                {postImages.length &&
                    postImages.map((image: string) => {
                        return <img key={image} src={image} />
                    })}
            </>
        </div>
    )
}
