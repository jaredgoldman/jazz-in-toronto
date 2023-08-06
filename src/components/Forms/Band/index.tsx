// Libararies
import { useRef, useState } from 'react'
// Components
import { Form, Formik } from 'formik'
import Button from '~/components/Button'
import { Input } from '../Fields'
import Upload from '../Fields/Upload'
import FormLayout from '~/layouts/FormLayout'
// Types
import { type Band } from '~/types/data'
import { type FormikContextType } from 'formik'
// hooks
import { useUploadThing } from '~/hooks/useUploadThing'
// Utils
import { api } from '~/utils/api'

export interface Values {
    name: string
    genre?: string
    photoPath?: string
    instagramHandle: string | undefined
    website?: string
    fileData?: {
        file: File
        dataURL: string
    }
}

interface Errors {
    name?: string
    genre?: string
    photoPath?: string
    instagramHandle?: string
    website?: string
}

interface Props {
    currentValues?: Band
}

export default function BandForm({ currentValues }: Props): JSX.Element {
    const [error, setError] = useState<string>('')
    // Abstract form context out of component so we can submit when
    // file uplaod is complete
    const formikRef = useRef<FormikContextType<Values>>(null)
    const bandMutation = api.band.create.useMutation()

    const initialValues: Values = currentValues
        ? {
              name: currentValues.name,
              instagramHandle: currentValues.instagramHandle || undefined,
              genre: currentValues.genre || undefined,
              website: currentValues.website || undefined,
              photoPath: currentValues.photoPath || undefined
          }
        : {
              name: '',
              instagramHandle: '',
              genre: '',
              website: '',
              photoPath: '',
              fileData: undefined
          }

    // Handle file uploads and form submission
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
                try {
                    bandMutation.mutate(newValues)
                } catch {
                    setError(
                        'There was an error uploading your data. Please try again.'
                    )
                }
                formikRef.current?.setSubmitting(false)
            }
        },
        onUploadError: () => {
            setError(
                'There was an error uploading your image data. Is your file too large?'
            )
        }
    })

    return (
        <FormLayout>
            <h1 className="mb-5">
                {currentValues ? `Edit band` : 'Add your band to our database'}
            </h1>
            <Formik
                innerRef={formikRef}
                initialValues={initialValues}
                validate={(values) => {
                    const errors: Errors = {}
                    if (!values.name) {
                        errors.name = 'Required'
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
                        <Input name="name" label="Name" />
                        <Input name="genre" label="Musical genre" />
                        <Upload
                            name="fileData"
                            label="Upload a band photo"
                            photoPath={initialValues.photoPath}
                        />
                        <Input
                            name="instagramHandle"
                            label="Instagram Handle"
                        />
                        <Input
                            name="website"
                            label="Website"
                            className="flex flex-col"
                        />
                        <div className="flex w-full flex-col items-center">
                            <div className="flex h-10 flex-col justify-center text-sm text-red-500">
                                {error && (
                                    <p className="text-red-500">{error}</p>
                                )}
                                {bandMutation.isSuccess && (
                                    <p className="text-green-500">
                                        Band added successfully!
                                    </p>
                                )}
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
