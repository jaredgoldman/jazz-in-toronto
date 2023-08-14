// Components
import { forwardRef, useImperativeHandle } from 'react'
import * as Form from '@radix-ui/react-form'
import { Input } from '../Fields'
import Upload from '../Fields/Upload'
import FormLayout from '~/layouts/FormLayout'
// Types
import { type Band } from '~/types/data'
// hooks
import useBandForm from './hooks/useBandForm'
import { Heading, Flex, Text } from '@radix-ui/themes'

interface Props {
    currentValues?: Band
    closeModal?: () => void
    onAdd?: (value: Band) => Promise<void>
    externalSubmit?: boolean
}

export default forwardRef(function BandForm(
    { currentValues, closeModal, onAdd, externalSubmit = false }: Props,
    ref: any
): JSX.Element {
    const {
        bandMutation,
        editBandMutation,
        handleDeletePhoto,
        error,
        submit,
        errors,
        control,
        onUpload
    } = useBandForm(currentValues, closeModal, onAdd)

    useImperativeHandle(ref, () => ({
        submitForm: submit
    }))

    return (
        <FormLayout>
            <Form.Root onSubmit={submit}>
                <Heading>
                    {currentValues
                        ? `Edit band`
                        : 'Add your band to our database'}
                </Heading>
                <Input
                    name="name"
                    label="Name"
                    error={errors.name}
                    control={control}
                    required="You must enter a band name"
                />
                <Input
                    name="genre"
                    label="Musical genre"
                    error={errors.genre}
                    control={control}
                />
                <Upload
                    name="fileData"
                    label="Upload a band photo"
                    onUpload={onUpload}
                    onDeletePhoto={handleDeletePhoto}
                    control={control}
                />
                <Input
                    name="instagramHandle"
                    label="Instagram Handle"
                    error={errors.instagramHandle}
                    control={control}
                />
                <Input
                    name="website"
                    label="Enter your website"
                    error={errors.website}
                    control={control}
                />
                <Flex>
                    {bandMutation.isSuccess && (
                        <Text>Event submitted succesfully</Text>
                    )}
                    {editBandMutation.isSuccess && (
                        <Text>Event edited succesfully</Text>
                    )}
                    {error && <Text>{error}</Text>}
                </Flex>
                {!externalSubmit && (
                    <Flex width="100%" justify="center">
                        <Form.Submit>Submit</Form.Submit>
                    </Flex>
                )}
            </Form.Root>
        </FormLayout>
    )
})
