// Components
import { Form, Formik } from 'formik'
import PlacesAutocomplete from '../Fields/PlacesAutoComplete'
import { Input } from '../Fields'
import Button from '~/components/Button'
import Upload from '../Fields/Upload'
import FormLayout from '~/layouts/FormLayout'
// Types
import { type Venue } from '~/types/data'
// Hooks
import useVenueForm from './hooks/useVenueForm'

export interface Values {
    name: string
    address: string
    latitude: number
    longitude: number
    city: string
    website: string
    instagramHandle?: string
    photoPath?: string
    fileData?: {
        file: File
        dataURL: string
    }
}

interface Errors {
    name?: string
    location?: string
}

interface Props {
    currentValues?: Venue
}

export default function VenueForm({ currentValues }: Props): JSX.Element {
    const {
        initialValues,
        venueMutation,
        editVenueMutation,
        handleDeletePhoto,
        startUpload,
        isEditing,
        error,
        setError
    } = useVenueForm(currentValues)

    return (
        <FormLayout>
            <h1 className="mb-5">
                {currentValues ? 'Edit venue' : 'Add your venue here!'}
            </h1>
            <Formik
                initialValues={initialValues}
                validate={(values) => {
                    const errors: Errors = {}
                    if (!values.name) {
                        errors.name = 'Required'
                    }
                    if (!values.latitude || !values.longitude || !values.city) {
                        errors.location = 'Please enter a valid location'
                    }
                    return errors
                }}
                onSubmit={async (values, { setSubmitting }) => {
                    try {
                        setError('')
                        let newValues = values
                        // if we have fileData in form Input
                        // upload it first
                        if (values?.fileData?.file) {
                            const res = await startUpload([
                                values.fileData.file
                            ])
                            if (res) {
                                newValues = {
                                    ...values,
                                    photoPath: res[0]?.fileUrl
                                }
                            }
                        }
                        if (isEditing && currentValues) {
                            await editVenueMutation.mutateAsync({
                                id: currentValues?.id,
                                ...newValues
                            })
                        } else {
                            await venueMutation.mutateAsync(newValues)
                        }
                    } catch (e) {
                        setSubmitting(false)
                        setError(
                            'There was an error adding your band. Please try again.'
                        )
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form className="flex flex-col">
                        <Input name="name" label="Venue Name" />
                        <PlacesAutocomplete name="location" label="Address" />
                        <Upload
                            name="fileData"
                            label="Upload a photo of your venue"
                            photoPath={initialValues.photoPath}
                            onDeletePhoto={handleDeletePhoto}
                        />
                        <Input name="instagramHandle" label="instagramHandle" />
                        <Input name="website" label="Venue Website" />
                        <div className="flex w-full flex-col items-center">
                            <div className="flex h-10 flex-col justify-center text-sm text-red-500">
                                {error && (
                                    <p className="text-red-500">{error}</p>
                                )}
                                {venueMutation.isSuccess ||
                                    (editVenueMutation.isSuccess && (
                                        <p className="text-green-500">
                                            `Success $
                                            {isEditing ? 'editing' : 'adding'}{' '}
                                            venue`
                                        </p>
                                    ))}
                            </div>
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                isLoading={isSubmitting}
                            >
                                Submit
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </FormLayout>
    )
}
