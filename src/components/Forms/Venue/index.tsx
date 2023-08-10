// Components
import { Form, Formik } from 'formik'
import PlacesAutocomplete from '../Fields/PlacesAutoComplete'
import { Input } from '../Fields'
import Button from '~/components/Button'
import Upload from '../Fields/Upload'
import FormLayout from '~/layouts/FormLayout'
import Number from '../Fields/Number'
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
        <FormLayout padding="lg">
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
                        <Input
                            name="name"
                            label="Venue Name"
                            placeHolder="Enter your venue's name"
                        />
                        <PlacesAutocomplete name="location" label="Address" />
                        <Upload
                            name="fileData"
                            label="Upload a photo of your venue"
                            photoPath={initialValues.photoPath}
                            onDeletePhoto={handleDeletePhoto}
                        />
                        <Number name="phoneNumber" />
                        <Input
                            name="instagramHandle"
                            label="Instagram Handle"
                            placeHolder="Enter your instagram hande"
                        />
                        <Input
                            name="website"
                            label="Venue Website"
                            placeHolder="Enter your venue's website"
                        />
                        <div className="flex w-full flex-col items-center">
                            <div className="flex flex-col justify-center text-sm text-red-500">
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
