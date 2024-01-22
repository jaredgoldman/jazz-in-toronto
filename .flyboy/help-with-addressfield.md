# User

```tsx
import PlacesAutocomplete from '../Fields/PlacesAutoComplete'
import { Input } from '../Fields'
import * as Form from '@radix-ui/react-form'
import Upload from '../Fields/Upload'
import { Heading, Text, Flex, Box, Button } from '@radix-ui/themes'
import useVenueForm from './hooks/useVenueForm'
import { useRouter } from 'next/router'
import { api } from '~/utils/api'
import { useEffect } from 'react'

export default function VenueForm() {
    const router = useRouter()
    const param = router.query.id as string
    const { data } = api.venue.get.useQuery({ id: param })
    const {
        isEditing,
        submit,
        errors,
        control,
        onSelectLocation,
        onUpload,
        handleDeletePhoto,
        venueMutationIsSuccess,
        editVenueMutationIsSuccess,
        error,
        reset
    } = useVenueForm(data ?? undefined)

    useEffect(() => {
        if (data) {
            reset(data)
        }
    }, [data, reset])

    return (
        <Flex
            direction="column"
            align="center"
            width="100%"
            className="max-w-xl"
        >
            <Box className="w-full">
                <Heading
                    size={{ initial: '8', xs: '9' }}
                    mb="6"
                    align={{ initial: 'center', xs: 'left' }}
                >
                    {isEditing ? 'Edit venue' : 'Add your venue'}
                </Heading>
                <Form.Root onSubmit={submit}>
                    <Flex direction="column" gap="5">
                        <Input
                            name="name"
                            label="Venue Name"
                            error={errors.name}
                            control={control}
                            required="Please eneter your venues name"
                        />
                        <PlacesAutocomplete
                            name="address"
                            label="Address"
                            control={control}
                            onSelect={onSelectLocation}
                        />
                        <Upload
                            name="fileData"
                            label="Upload a photo of your venue"
                            onUpload={onUpload}
                            control={control}
                            onDeletePhoto={handleDeletePhoto}
                        />
                        <Input
                            name="phoneNumber"
                            label="Enter your venues phone number"
                            error={errors.phoneNumber}
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
                            label="Venue Website"
                            error={errors.website}
                            control={control}
                        />
                    </Flex>
                    <Flex width="100%" align="center" mt="3">
                        {venueMutationIsSuccess && (
                            <Text size="2" color="green" align="center">
                                Venue submitted succesfully
                            </Text>
                        )}
                        {editVenueMutationIsSuccess && (
                            <Text size="2" color="green" align="center">
                                Venue edited succesfully
                            </Text>
                        )}
                        {error && (
                            <Text size="2" color="red" align="center">
                                {error}
                            </Text>
                        )}
                    </Flex>
                    <Flex width="100%" justify="center">
                        <Form.Submit asChild>
                            <Button className="w-full" variant="solid">
                                Submit
                            </Button>
                        </Form.Submit>
                    </Flex>
                </Form.Root>
            </Box>
        </Flex>
    )
}
```

This form is made to open with prefilled values in a certain context. This works except for with the PlacesAutoComplete component. Here is the code for that component:

```tsx
/* eslint-disable */
// Libraries
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng
} from 'use-places-autocomplete'
import useOnclickOutside from 'react-cool-onclickoutside'
// Components
import * as Form from '@radix-ui/react-form'
import { TextField, Strong, Text } from '@radix-ui/themes'
import {
    Control,
    Controller,
    FieldError,
    FieldValues,
    Path
} from 'react-hook-form'

interface Props<T extends FieldValues> {
    label: string
    name: Path<T>
    control: Control<T>
    onSelect: (
        address: string,
        latitude: number,
        longitude: number,
        city: string
    ) => void
    error?: FieldError
    placeHolder?: string
    required?: boolean | string
}

export default function PlacesAutocomplete<T extends FieldValues>({
    label,
    name,
    placeHolder,
    onSelect,
    error,
    control,
    required = false
}: Props<T>): JSX.Element {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions
    } = usePlacesAutocomplete({
        requestOptions: {
            /* Define search scope here */
            // locationRestriction: {
            //     latLng: { lat: () => 43.65107, lng: () => -79.347015 },
            //     radius: 2800 * 1000, // approximately radius to cover the whole Canada
            // },
        },
        debounce: 300
    })
    const ref = useOnclickOutside(() => {
        // When user clicks outside of the component, we can dismiss
        // the searched suggestions by calling this method
        clearSuggestions()
    })

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Update the keyword of the input element
        setValue(e.target.value)
    }

    const handleSelect = async ({ description }: { description: string }) => {
        // When user selects a place, we can replace the keyword without request data from API
        // by setting the second parameter to "false"
        setValue(description, false)
        clearSuggestions()

        // Get latitude and longitude via utility functions
        const results = await getGeocode({ address: description })
        const { lat, lng } = getLatLng(results[0])
        const city =
            results[0]?.address_components[3]?.long_name || 'city unknonw'
        onSelect(description, lat, lng, city)
    }

    const renderSuggestions = () =>
        data.map((suggestion) => {
            const {
                place_id,
                structured_formatting: { main_text, secondary_text }
            } = suggestion

            const select = async () => {
                await handleSelect(suggestion)
            }

            return (
                <li key={place_id} onKeyDown={select} onClick={select}>
                    <Strong>{main_text}</Strong> <Text>{secondary_text}</Text>
                </li>
            )
        })

    return (
        <Controller
            control={control}
            rules={{ required }}
            name={name}
            render={({ field }) => (
                <Form.Field ref={ref} name={name}>
                    <Form.Label>{label}</Form.Label>
                    <Form.Control asChild>
                        <TextField.Input
                            value={value}
                            onChange={(event) => {
                                handleInput(event)
                            }}
                            disabled={!ready}
                            placeholder={placeHolder}
                            onBlur={field.onBlur}
                        />
                    </Form.Control>
                    {/* We can use the "status" to decide whether we should display the dropdown or not */}
                    {status === 'OK' && <ul>{renderSuggestions()}</ul>}
                    {error && (
                        <Text size="2" color="red">
                            {error.message}
                        </Text>
                    )}
                </Form.Field>
            )}
        />
    )
}
```

What do I need to change in the component to make it able to prefill with data?

# Assistant

The problem with the current implementation is that `usePlacesAutocomplete` hook doesn't provide a mechanism to preset the initial state of the selected place.
To fix this issue, we can introduce a new prop `initialValue`, and update the `value` used in `TextField.Input` as below.
Add the `initialValue` prop in the `Props` Interface:

```tsx
interface Props<T extends FieldValues> {
    // ...other props
    initialValue?: string
}
```

Then in the `PlacesAutocomplete` function:

```tsx
export default function PlacesAutocomplete<T extends FieldValues>({
    label,
    name,
    initialValue,
    placeHolder,
    onSelect,
    error,
    control,
    required = false
}: Props<T>): JSX.Element {
    // other parts of code...
    const [selectedPlace, setSelectedPlace] = useState<string | undefined>()
    useEffect(() => {
        if (initialValue && !selectedPlace) setSelectedPlace(initialValue)
    }, [initialValue])
    // other parts of code...
    const handleSelect = async ({ description }: { description: string }) => {
        // update selected place
        setSelectedPlace(description)
        // other parts of your code...
    }
    // other parts of code...
    return (
        <Controller
            control={control}
            rules={{ required }}
            name={name}
            render={({ field }) => (
                <Form.Field ref={ref} name={name}>
                    <Form.Label>{label}</Form.Label>
                    <Form.Control asChild>
                        <TextField.Input
                            value={selectedPlace || initialValue || value}
                            // other parts of your code...
                        />
                    </Form.Control>
                    {/* other parts of your code... */}
                </Form.Field>
            )}
        />
    )
}
```

Here, we've used the `useState` and `useEffect` hooks to hold and set our initial value. If no selected place has been set and we have an initial value, then we set the selected place to be that initial value.
Finally in the `VenueForm` component pass the field value to `initialValue` prop of your `PlacesAutocomplete` component.

```tsx
<PlacesAutocomplete
    name="address"
    initialValue={venueFormValues.address}
    // other props ...
/>
```

Here, `venueFormValues.address` is assumed to be the field value that you want to set as initial value for the autocomplete component. Please replace it with actual field value you may have in your component.
Remember, this is a workaround as use-places-autocomplete doesn't seem to provide a way to achieve this directly. As such it may not provide the same user experience. For example, user won’t see the selected place's address split into main text and secondary text as the library typically provides.

# User
