import { useEffect, useRef } from 'react'
// Components
import { Form, Formik } from 'formik'
import PlacesAutocomplete from '../Fields/PlacesAutoComplete'
import { Input } from '../Fields'
import Button from '~/components/Button'
import Upload from '../Fields/Upload'
// Types
import { type Venue } from '~/types/data'
import { type FormikContextType } from 'formik'
// Utils
import { api } from '~/utils/api'
// Hooks
import { useUploadThing } from '~/hooks/useUploadThing'

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
    // Abstract form context out of component so we can submit when
    // file uplaod is complete
    const formikRef = useRef<FormikContextType<Values>>(null)
    const venueMutation = api.venue.create.useMutation()

    // If we're editing, initial values = db row values
    const initialValues: Values = currentValues
        ? {
              ...currentValues,
              photoPath: currentValues.photoPath || undefined,
              instagramHandle: currentValues.instagramHandle || undefined
          }
        : {
              name: '',
              photoPath: '',
              latitude: 0,
              longitude: 0,
              city: '',
              address: '',
              instagramHandle: '',
              website: '',
              fileData: undefined
          }

    useEffect(() => {
        console.log(
            'formikRef?.current?.isSubmitting',
            formikRef?.current?.isSubmitting
        )
    }, [formikRef?.current?.isSubmitting])

    const { startUpload } = useUploadThing({
        endpoint: 'uploadImage',
        onClientUploadComplete: (uploadedFileData) => {
            if (uploadedFileData && formikRef.current?.values) {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { fileData, ...rest } = formikRef.current?.values
                const newValues = {
                    ...rest,
                    photoPath: uploadedFileData[0]?.fileUrl
                }
                venueMutation.mutate(newValues)
                formikRef.current.setSubmitting(false)
            }
        },
        onUploadError: (e) => {
            console.log('Error uploading file', e)
        }
    })

    return (
        <div>
            <h1 className="mb-5">
                {currentValues ? 'Edit venue' : 'Add your venue here!'}
            </h1>
            <Formik
                innerRef={formikRef}
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
                onSubmit={async (values) => {
                    // Start upload for now
                    if (values?.fileData?.file) {
                        await startUpload([values.fileData.file])
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
                        />
                        <Input name="instagramHandle" label="instagramHandle" />
                        <Input name="website" label="Venue Website" />
                        <Button type="submit" disabled={isSubmitting}>
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
