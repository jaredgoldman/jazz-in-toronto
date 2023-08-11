// Components
import { Form, Formik } from 'formik'
import Button from '~/components/Button'
import { Input } from '../Fields'
import Upload from '../Fields/Upload'
import FormLayout from '~/layouts/FormLayout'
// Types
import { type Band } from '~/types/data'
// hooks
import useBandForm from './hooks/useBandForm'

interface Props {
    currentValues?: Band
    closeModal?: () => void
    onAdd?: (value: Band) => Promise<void>
}

export default function BandForm({
    currentValues,
    closeModal,
    onAdd
}: Props): JSX.Element {
    const {
        initialValues,
        bandMutation,
        editBandMutation,
        handleDeletePhoto,
        isEditing,
        error,
        onSubmit,
        validate
    } = useBandForm(currentValues, closeModal, onAdd)

    return (
        <FormLayout>
            <h1 className="mb-5">
                {currentValues ? `Edit band` : 'Add your band to our database'}
            </h1>
            <Formik
                initialValues={initialValues}
                validate={validate}
                onSubmit={onSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="flex flex-col">
                        <Input name="name" label="Name" />
                        <Input name="genre" label="Musical genre" />
                        <Upload
                            name="fileData"
                            label="Upload a band photo"
                            photoPath={initialValues.photoPath}
                            onDeletePhoto={handleDeletePhoto}
                        />
                        <Input
                            name="instagramHandle"
                            label="Instagram Handle"
                        />
                        <Input name="website" label="Website" />
                        <div className="flex w-full flex-col items-center">
                            <div className="flex h-10 flex-col justify-center text-sm text-red-500">
                                {error && (
                                    <p className="text-red-500">{error}</p>
                                )}
                                {bandMutation.isSuccess ||
                                    (editBandMutation.isSuccess && (
                                        <p className="text-green-500">
                                            {`Band ${
                                                isEditing ? 'edited' : 'added'
                                            } successfully!`}
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
