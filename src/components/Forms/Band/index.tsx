import { Form, Formik } from 'formik'
import { api } from '~/utils/api'
import { Input } from '../Fields'
import Button from '~/components/Button'
import { Band } from '@prisma/client'

export interface Values {
    name: string
    genre: string
    photoPath?: string
    instagramHandle: string | null | undefined
    website?: string
}

interface Props {
    currentValues?: Band
}

export default function BandForm({ currentValues }: Props): JSX.Element {
    const bandMutation = api.band.create.useMutation()
    const initialValues = currentValues
        ? {
              name: currentValues.name,
              instagramHandle: currentValues.instagramHandle || undefined,
              genre: currentValues.genre || undefined,
              website: currentValues.website || undefined
          }
        : { name: '', instagramHandle: '', genre: '', website: '' }

    return (
        <div className="w-full">
            <h1 className="mb-5">
                {currentValues ? `Edit band` : 'Add your band to our database'}
            </h1>
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
