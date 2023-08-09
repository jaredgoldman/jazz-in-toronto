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

interface Props {
    currentValues?: Venue
    closeModal?: () => void
    onAdd?: (value: Venue) => Promise<void>
}

export default function VenueForm({
    currentValues,
    closeModal,
    onAdd
}: Props): JSX.Element {
    const {
        initialValues,
        venueMutation,
        editVenueMutation,
        handleDeletePhoto,
        isEditing,
        error,
        onSubmit,
        validate
    } = useVenueForm(currentValues, closeModal, onAdd)

    return (
        <FormLayout>
            <h1 className="mb-5">
                {currentValues ? 'Edit venue' : 'Add your venue here!'}
            </h1>
            <Formik
                initialValues={initialValues}
                validate={validate}
                onSubmit={onSubmit}
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
