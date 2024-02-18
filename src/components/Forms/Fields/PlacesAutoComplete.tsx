import { useEffect } from 'react'
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng
} from 'use-places-autocomplete'
import useOnclickOutside from 'react-cool-onclickoutside'
import * as Form from '@radix-ui/react-form'
import { TextField, Strong, Text, Box } from '@radix-ui/themes'
import {
    Control,
    Controller,
    FieldError,
    FieldValues,
    Path,
    useFormContext
} from 'react-hook-form'
import { VenueFormValues } from '../Venue/hooks/useVenueForm'
import { setFormValues } from '../utils'

interface Props<T extends FieldValues> {
    label: string
    name: Path<T>
    control: Control<T>
    error?: FieldError
    placeHolder?: string
    required?: boolean | string
}

export default function PlacesAutocomplete<T extends FieldValues>({
    label,
    name,
    placeHolder,
    error,
    control,
    required = false
}: Props<T>): JSX.Element {
    const { watch, setValue: setFormValue } = useFormContext<VenueFormValues>()
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions
    } = usePlacesAutocomplete({
        requestOptions: {
            region: 'CA',
            componentRestrictions: {
                country: ['ca']
            },
            locationBias: {
                north: 56.852592,
                south: 41.675105,
                west: -95.156227,
                east: -74.875761
            }
        },
        debounce: 300
    })

    const watchedAddress = watch('address')

    useEffect(() => {
        if (watchedAddress) setValue(watchedAddress)
    }, [watchedAddress, setValue])

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

        try {
            // Get latitude and longitude via utility functions
            const results = await getGeocode({ address: description })
            const { lat, lng } = getLatLng(
                results[0] as google.maps.GeocoderResult
            )
            const city =
                results[0]?.address_components[3]?.long_name || 'city unknown'

            const fullAddress = results[0]?.formatted_address || description // Fallback to description if full address isn't available

            setFormValues<VenueFormValues>(
                {
                    city,
                    latitude: lat,
                    longitude: lng,
                    address: fullAddress
                },
                setFormValue
            )
        } catch (e) {
            console.log('ERROR', e)
        }
    }

    const renderSuggestions = () =>
        data.map((suggestion) => {
            const {
                place_id,
                structured_formatting: { main_text, secondary_text }
            } = suggestion

            return (
                <li
                    key={place_id}
                    onClick={async () => {
                        await handleSelect(suggestion)
                    }}
                    className="cursor-pointer"
                >
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
                    {status === 'OK' && watch('address') !== value && (
                        <Box className="relative">
                            <ul className="bg-[var(--sand-1)]-opacity absolute w-full rounded-sm p-2 shadow-md backdrop-invert backdrop-opacity-40">
                                {renderSuggestions()}
                            </ul>
                        </Box>
                    )}
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
