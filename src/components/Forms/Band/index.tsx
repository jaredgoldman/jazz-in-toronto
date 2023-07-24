// Components
import { Form, Formik } from 'formik'
import Button from '~/components/Button'
import { Input } from '../Fields'
// Types
import { type Band } from '~/types/data'
// Utils
import { api } from '~/utils/api'

export interface Values {
    name: string
    genre?: string
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
                validate={(values) => {
                    const errors: any = {}
                    if (!values.name) {
                        errors.name = 'Required'
                    }
                    return errors
                }}
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
