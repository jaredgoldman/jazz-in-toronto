// Libraries
import { forwardRef, useImperativeHandle, type Ref } from 'react'
// Components
import * as Form from '@radix-ui/react-form'
import { Input } from '../Fields'
import Upload from '../Fields/Upload'
import FormLayout from '~/layouts/FormLayout'
import { Heading, Flex, Text } from '@radix-ui/themes'
// Types
import { type Band } from '~/types/data'
// hooks
import useBandForm from './hooks/useBandForm'

interface Props {
    currentValues?: Band
    onAdd?: (value: Band) => Promise<void>
    externalSubmit?: boolean
}

export default forwardRef(function BandForm(
    { currentValues, onAdd, externalSubmit = false }: Props,
    ref: Ref<unknown> | undefined
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
    } = useBandForm(currentValues, onAdd)

    /*
     * useImperative handle helps reference methods
     * in a sibling or parents components
     * helpful for nested forms like this one
     */
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
                <Flex direction="column" gap="3">
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
                    <Flex></Flex>
                    {bandMutation.isSuccess && (
                        <Text size="2" color="green" align="center">
                            Event submitted succesfully
                        </Text>
                    )}
                    {editBandMutation.isSuccess && (
                        <Text size="2" color="green" align="center">
                            Event edited succesfully
                        </Text>
                    )}
                    {error && (
                        <Text size="2" color="red" align="center">
                            {error}
                        </Text>
                    )}
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
